<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartsItem extends Model
{
    protected $table = 'cart_item';

    protected $fillable = [
        'cart_id',
        'book_id',
        'quantity'
    ];

    public function book(){
        return $this->belongsTo(Books:: class, 'book_id');
    }

    public function cart(){
        return $this->belongsTo(Cart:: class, 'cart_id');
    }

}
