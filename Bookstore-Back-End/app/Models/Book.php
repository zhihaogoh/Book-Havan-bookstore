<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'book_name',
        'book_author',
        'book_description',
        'book_price',
        'book_image',
        'book_quantity',
        'book_publisher',
        'book_language',
        'book_pages',
        'book_isbn',
        'categories_id',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'categories_id');
    }
}
