<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
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
            'book_name' => $this->book_name,
            'author_id' => $this->author_id,
            'categories_id' => $this->categories_id,
            'book_price' => (float) $this->book_price,
            'book_quantity' => $this->book_quantity,
            'book_description' => $this->book_description,
            'book_image' => $this->book_image,
            'book_publisher' => $this->book_publisher,
            'book_language' => $this->book_language,
            'book_pages' => $this->book_pages,
            'book_isbn' => $this->book_isbn,
        ];
    }
}
