<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Books extends Model
{
    protected $fillable = [
        'book_name',
        'author_id',
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

    public function author()
    {
        return $this->belongsTo(Author::class, 'author_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'categories_id');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'book_id');
    }
}
