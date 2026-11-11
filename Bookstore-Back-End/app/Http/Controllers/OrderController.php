<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderItemRequest;
use App\Http\Requests\StoreOrderRequest;
use App\Models\Books;
use App\Models\OrderItem;
use App\Models\Orders;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Orders::with(['user', 'orderItems.book'])
            ->where('user_id', $request->user()->id)->get();

        return response()->json([
            'message' => 'Orders retrieved successfully',
            'orders' => $orders,
        ], 200);
    }

    public function store(StoreOrderRequest $request)
    {
        $validated = $request->validated();
        $items = $validated['items'] ?? [];
        unset($validated['items']);
        foreach (['discount_total', 'shipping_total', 'tax_total'] as $field) {
            $validated[$field] = $validated[$field] ?? 0;
        }
        $validated['user_id'] = $request->user()->id;
        $validated['placed_at'] = now();

        $order = DB::transaction(function () use ($validated, $items) {
            $validated['order_number'] = (string) Str::uuid();

            $order = Orders::create($validated);
            $order->update([
                'order_number' => 'PO'.str_pad(
                    (string) $order->id,
                    3,
                    '0',
                    STR_PAD_LEFT
                ),
            ]);
            if ($items !== []) {
                $this->addItemsToOrder($order, $items);
            }

            return $order->refresh()->load('orderItems.book');
        });

        return response()->json([
            'message' => 'Order created successfully',
            'order' => $order,
        ], 201);
    }

    public function items(Request $request)
    {
        $orderItems = OrderItem::with(['order', 'book'])
            ->whereHas('order', function ($query) use ($request) {
                $query->where('user_id', $request->user()->id);
            })->get();

        return response()->json([
            'message' => 'Order items retrieved successfully',
            'orderItems' => $orderItems,
        ], 200);
    }

    public function storeItems(StoreOrderItemRequest $request)
    {

        $validated = $request->validated();
        [$orderItems, $order] = DB::transaction(function () use ($validated, $request) {

            $order = Orders::where('user_id', $request->user()->id)
                ->lockForUpdate()->findOrFail($validated['order_id']);

            $itemIds = $this->addItemsToOrder($order, $validated['items']);

            return [$order->orderItems()->with('book')->whereIn('id', $itemIds)->get(), $order->refresh()];
        });

        return response()->json([
            'message' => 'Order items added successfully',
            'orderItems' => $orderItems,
            'order' => $order,
        ], 201);
    }

    public function destroyItem(Request $request, string $id)
    {
        $orderItem = DB::transaction(function () use ($request, $id) {
            $orderId = OrderItem::whereKey($id)->firstOrFail()->order_id;
            $order = Orders::where('user_id', $request->user()->id)
                ->lockForUpdate()->findOrFail($orderId);
            $item = $order->orderItems()->lockForUpdate()->findOrFail($id);
            $item->delete();
            $this->recalculateTotals($order);

            return $item;
        });

        return response()->json([
            'message' => 'Order item deleted successfully',
            'orderItem' => $orderItem,
        ], 200);
    }

    private function recalculateTotals(Orders $order): void
    {
        $items = $order->orderItems()->get();
        $subtotal = $items->sum(fn ($item) => $item->price_per_unit * $item->quantity);
        $discount = $items->sum('discount_amount');
        $tax = $items->sum('tax_amount');
        $order->update([
            'subtotal' => $subtotal,
            'discount_total' => $discount,
            'tax_total' => $tax,
            'grand_total' => round($subtotal - $discount + $tax + $order->shipping_total, 2),
        ]);
    }

    private function addItemsToOrder(Orders $order, array $requestedItems): array
    {
        $itemIds = [];
        foreach ($requestedItems as $index => $requestedItem) {
            $book = Books::whereKey($requestedItem['book_id'])
                ->lockForUpdate()->firstOrFail();
            $item = $order->orderItems()->where('book_id', $book->id)
                ->lockForUpdate()->first();
            $quantity = ($item?->quantity ?? 0) + $requestedItem['quantity'];
            $available = $book->stock_on_hand - $book->stock_reserved;

            if ($quantity > $available) {
                throw ValidationException::withMessages([
                    "items.$index.quantity" => ['Not enough stock available.'],
                ]);
            }

            // Keep the original price and line adjustments when adding more copies.
            $values = [
                'book_id' => $book->id,
                'title_book' => $item?->title_book ?? $requestedItem['title_book'],
                'SKU' => $item?->SKU ?? $requestedItem['SKU'],
                'price_per_unit' => $item?->price_per_unit ?? $requestedItem['price_per_unit'],
                'discount_amount' => $item?->discount_amount ?? $requestedItem['discount_amount'] ?? 0,
                'tax_amount' => $item?->tax_amount ?? $requestedItem['tax_amount'] ?? 6,
                'quantity' => $quantity,
            ];
            $values['subtotal'] = round(
                $values['price_per_unit'] * $quantity - $values['discount_amount'] + $values['tax_amount'],
                2
            );

            if ($item) {
                $item->update($values);
            } else {
                $item = $order->orderItems()->create($values);
            }
            $itemIds[] = $item->id;
        }

        $this->recalculateTotals($order);

        return $itemIds;
    }
}
