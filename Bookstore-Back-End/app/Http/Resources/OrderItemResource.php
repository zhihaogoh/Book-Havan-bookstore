<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
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
            'order_id' => $this->order_id,
            'book_id' => $this->book_id,
            'quantity' => $this->quantity,
            'title_book' => $this->title_book,
            'SKU' => $this->SKU,
            'price_per_unit' => $this->price_per_unit,
            'discount_amount' => $this->discount_amount,
            'tax_amount' => $this->tax_amount,
            'subtotal' => $this->subtotal
        ];
    }
}
