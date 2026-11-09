<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'cart' => $this->whenLoaded('cart', function () {
                return [
                    'user' => $this->whenLoaded('user') && $this->cart->user ? [
                        'id' => $this->cart->user->id,
                        'user_name' => $this->cart->user->first_name,
                    ] : null,
                ];
            }),
            'book' => $this->whenLoaded('book', function () {
                return [
                    'id' => $this->book->id,
                    'book_name' => $this->book->book_name,
                    'book_price' => $this->book->book_price,
                    'book_quantity' => $this->book->book_quantity,
                    'author' => $this->whenLoaded('author') && $this->book->author ? [
                        'id' => $this->book->author->id,
                        'author_name' => $this->book->author->author_name,

                    ] : null,
                    'discount_percentage' => $this->book->discount_percentage,
                ];
            }),
            'quantity' => $this->quantity

        ];
    }
}
