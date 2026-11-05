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
                    'book__price' => $this->book->book_price
                ];
            }),
            'quantity' => $this->quantity

        ];
    }
}
