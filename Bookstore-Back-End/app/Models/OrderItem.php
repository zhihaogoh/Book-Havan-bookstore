<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $table = 'order_item';

    protected $fillable = [
        'order_id',
        'book_id',
        'quantity',
        'title_book',
        'SKU',
        'price_per_unit',
        'discount_amount',
        'tax_amount',
        'subtotal',
    ];

    public function order()
    {
        return $this->belongsTo(Orders::class, 'order_id');
    }

    public function book()
    {
        return $this->belongsTo(Books::class, 'book_id');
    }
}
