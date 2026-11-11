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
            'subtotal' => $this->subtotal,
            'orders' => $this->whenLoaded(
                'order',
                function () {
                    return [
                        'id' => $this->order->id,
                        'order_number' => $this->order->order_number,
                        'status' => $this->order->status,
                        'currency' => $this->order->currency,
                        'subtotal' => $this->order->subtotal,
                        'discount_total' => $this->order->discount_total,
                        'shipping_total' => $this->order->shipping_total,
                        'tax_total' => $this->order->tax_total,
                        'grand_total' => $this->order->grand_total,
                        'placed_at' => $this->order->placed_at,
                    ];
                }
            ),
        ];
    }
}
