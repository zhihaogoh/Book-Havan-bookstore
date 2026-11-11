<?php

namespace App\Http\Controllers;

use App\Http\Resources\CartResource;
use App\Models\Books;
use App\Models\Cart;
use App\Models\CartsItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $carts = CartsItem::with(['cart', 'book'])
            ->whereHas('cart', function ($query) use ($request) {
                $query->where('user_id', $request->user()->id);
            })->get();
        return CartResource::collection($carts);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.book_id' => 'required|integer|exists:books,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);
        $item = DB::transaction(function () use ($request, $data) {


            $cart = Cart::firstOrCreate([
                'user_id' => $request->user()->id,
            ]);

            foreach ($data['items'] as $requestedItem) {

                $book = Books::whereKey($requestedItem['book_id'])
                    ->lockForUpdate()
                    ->firstOrFail();

                $item =  CartsItem::where('cart_id', $cart->id)
                    ->where('book_id', $book->id)
                    ->lockForUpdate()
                    ->first();

                $newQuantity = ($item?->quantity ?? 0) + $requestedItem['quantity'];
                $available = $book->stock_on_hand
                    - $book->stock_reserved;

                if ($newQuantity > $available) {
                    throw ValidationException::withMessages([
                        'quantity' => ['Not enough stock available.'],
                    ]);
                }

                if ($item) {
                    $item->update([
                        'quantity' => $newQuantity,
                    ]);
                } else {
                    $item = CartsItem::create([
                        'cart_id' => $cart->id,
                        'book_id' => $book->id,
                        'quantity' => $newQuantity,
                    ]);
                }
            }
            return $item->load('book');
        });

        return response()->json([
            'message' => 'Book added to cart successfully',
            'data' => new CartResource($item),
        ], 201);
    }
    public function update(Request $request, String $id)
    {
        $data = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = DB::transaction(function () use ($request, $id, $data) {

            $item = CartsItem::whereKey($id)
                ->whereHas('cart', function ($query) use ($request) {
                    $query->where('user_id', $request->user()->id);
                })
                ->lockForUpdate()
                ->firstOrFail();

            $book = Books::whereKey($item->book_id)
                ->lockForUpdate()
                ->firstOrFail();

            $available = $book->stock_on_hand
                - $book->stock_reserved;

            if ($data['quantity'] > $available) {
                throw ValidationException::withMessages([
                    'quantity' => ['Not enough stock available.'],
                ]);
            }

            $item->update([
                'quantity' => $data['quantity'],
            ]);

            return $item->load('book', 'cart.user');
        });

        return response()->json([
            'message' => 'Cart quantity updated successfully',
            'data' => new CartResource($cartItem),
        ], 201);
    }


    public function destroy(Request $request, string $id)
    {
        $cartItem = CartsItem::whereKey($id)
            ->whereHas('cart', function ($query) use ($request) {
                $query->where('user_id', $request->user()->id);
            })
            ->firstOrFail();

        $cartItem->delete();

        return response()->json([
            'message' => 'Cart item deleted successfully',
            'cart_item' => $cartItem
        ], 201);
    }


    public function clear(Request $request)
    {
        $deletedCount = CartsItem::whereHas(
            'cart',
            function ($query) use ($request) {
                $query->where(
                    'user_id',
                    $request->user()->id
                );
            }
        )->delete();

        return response()->json([
            'message' => 'Cart cleared successfully',
            'deleted_items' => $deletedCount,
        ], 201);
    }
}
