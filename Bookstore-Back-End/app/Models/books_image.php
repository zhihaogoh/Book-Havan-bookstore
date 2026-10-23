<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Books_image extends Model
{
    protected $table = 'books_image';

     protected $fillable = [
        'book_id',
        'path',
        'alt_text',
        'sort_order',
    ];

    public function book()
    {
        return $this->belongsTo(Books::class, 'book_id');
    }
}
