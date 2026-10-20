<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImageBooks extends Model
{
     protected $fillable = [
        'book_id',
        'path',
        'alt_text',
        'sort_order',
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
