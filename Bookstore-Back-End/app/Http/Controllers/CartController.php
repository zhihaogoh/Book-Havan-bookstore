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
            'book_id' => 'required|integer|exists:books,id',
            'quantity' => 'required|integer|min:1',
        ]);
        $item = DB::transaction(function () use ($request, $data) {
            $book = Books::whereKey($data['book_id'])
                ->lockForUpdate()
                ->firstOrFail();

            $cart = Cart::firstOrCreate([
                'user_id' => $request->user()->id,
            ]);

            $item =  CartsItem::where('cart_id', $cart->id)
                ->where('book_id', $book->id)
                ->lockForUpdate()
                ->first();

            $newQuantity = ($item?->quantity ?? 0) + $data['quantity'];
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
                    'quantity' => $data['quantity'],
                ]);
            }

            return $item->load('book');
        });
        return response()->json([
            'message' => 'Book added to cart successfully',
            'data' => new CartResource($item),
        ], 201);
    }

    public function destroy(Request $request, $id)
    {
        $cartItem = CartsItem::whereKey($id)
            ->whereHas('cart', function ($query) use ($request) {
                $query->where(
                    'user_id',
                    $request->user()->id
                );
            })
            ->firstOrFail();

        $cartItem->delete();

        return response()->json([
            'message' => 'Book removed from cart successfully',
        ], 200);
    }
}
