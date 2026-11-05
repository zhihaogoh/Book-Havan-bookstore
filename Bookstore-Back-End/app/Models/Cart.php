<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $table = 'cart';

    protected $fillable  = [
         'user_id'
    ];

    public function user(){
        return $this->belongsTo(User:: class, 'user_id');
    }
}
