<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderItemRequest;
use App\Models\OrderItem;
use App\Models\Orders;
use Illuminate\Support\Facades\DB;

class OrderItemController extends Controller
{
    public function index()
    {
        $orderItems = OrderItem::with(['order', 'book'])->get();

        return response()->json([
            'message' => 'Order items retrieved successfully',
            'orderItems' => $orderItems
        ], 200);
    }

    public function store(StoreOrderItemRequest $request)
    {

        $validated = $request->validated();
        $validated['discount_amount'] = $validated['discount_amount'] ?? 0;
        $validated['tax_amount'] = $validated['tax_amount'] ?? 0;
        $validated['subtotal'] = round(($validated['price_per_unit'] * $validated['quantity']) - $validated['discount_amount'] + $validated['tax_amount'], 2);

        [$orderItem, $order] = DB::transaction(function () use ($validated, $request) {
            $order = Orders::where('user_id', $request->user()->id)
                ->lockForUpdate()->findOrFail($validated['order_id']);

            $orderItem = $order->orderItems()->create($validated);
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

            return [$orderItem, $order->refresh()];
        });
        return response()->json([
            'message' => 'Order item created successfully',
            'orderItem' => $orderItem,
            'order' => $order,
        ], 201);
    }

    public function destroy(string $id)
    {
        $orderItem = OrderItem::with(['order', 'book'])->findOrFail($id);
        $orderItem->delete();
        $id = $orderItem->order_id;
        $order = Orders::where('id', $id)->lockForUpdate()->findOrFail($id);
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
        return response()->json([
            'message' => 'Order item deleted successfully',
            'orderItem' => $orderItem
        ], 200);
    }
}
