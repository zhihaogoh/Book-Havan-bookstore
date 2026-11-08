<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WishlistItem extends Model
{
        protected $table = 'wishlist_item';

    protected $fillable = [
        'wishlist_id',
        'book_id',
    ];

    public function book(){
        return $this->belongsTo(Books:: class, 'book_id');
    }

    public function wishlist(){
        return $this->belongsTo(Wishlist:: class, 'wishlist_id');
    }
}
