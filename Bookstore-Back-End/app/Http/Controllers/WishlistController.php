<?php

namespace App\Http\Controllers;

use App\Http\Resources\WishlistResource;
use App\Models\Books;
use App\Models\Wishlist;
use App\Models\WishlistItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WishlistController extends Controller
{
    public function index(Request $request)
    {
        $wishlist = WishlistItem::with(['wishlist', 'book'])
            ->whereHas('wishlist', function ($query) use ($request) {
                $query->where('user_id', $request->user()->id);
            })->get();
        return WishlistResource::collection($wishlist);
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'book_id' => 'required|integer|exists:books,id',
        ]);
        $item = DB::transaction(function () use ($request, $data) {
            $book = Books::whereKey($data['book_id'])
                ->lockForUpdate()
                ->firstOrFail();

            $wishlist = Wishlist::firstOrCreate([
                'user_id' => $request->user()->id,
            ]);


            $item = WishlistItem::create([
                'wishlist_id' => $wishlist->id,
                'book_id' => $book->id,

            ]);

            return $item->load('book');
        });
        return response()->json([
            'message' => 'Book added to wishlist successfully',
            'data' => new WishlistResource($item),
        ], 201);
    }

    public function clear(Request $request ,string $id )
    {
        $cartItem = WishlistItem::whereKey($id)
            ->whereHas('wishlist', function ($query) use ($request) {
                $query->where('user_id', $request->user()->id);
            })
            ->firstOrFail();

        $cartItem->delete();

        return response()->json([
            'message' => 'Cart item deleted successfully',
        ], 201);
    }
}
