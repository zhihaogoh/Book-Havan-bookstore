<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreBookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'book_name' => 'required|string|max:255|unique:books,book_name',
            'book_author' => 'required|string|max:255',
            'book_description' => 'required|string',
            'book_price' => 'required|numeric|min:0',
            'book_image' => 'required|string|max:255',
            'book_quantity' => 'required|integer|min:0',
            'book_publisher' => 'required|string|max:255',
            'book_language' => 'required|string|max:255',
            'book_pages' => 'required|string|min:1',
            'book_isbn' => 'required|string|max:255|unique:books,book_isbn',
            'categories_id' => 'required|integer|exists:categories,id',
        ];
    }

    public function messages(): array
    {
        return [
            'book_name.required' => 'The book name is required.',
            'book_name.string' => 'The book name must be a string.',
            'book_name.max' => 'The book name may not be greater than 255 characters.',
            'book_name.unique' => 'The book name has already been taken.',

            'book_author.required' => 'The book author is required.',
            'book_author.string' => 'The book author must be a string.',
            'book_author.max' => 'The book author may not be greater than 255 characters.',

            'book_description.required' => 'The book description is required.',
            'book_description.string' => 'The book description must be a string.',

            'book_price.required' => 'The book price is required.',
            'book_price.numeric' => 'The book price must be a number.',
            'book_price.min' => 'The book price must be at least 0.',

            'book_image.required' => 'The book image is required.',
            'book_image.string' => 'The book image must be a string.',
            'book_image.max' => 'The book image may not be greater than 255 characters.',

            'book_quantity.required' => 'The book quantity is required.',
            'book_quantity.integer' => 'The book quantity must be an integer.',
            'book_quantity.min' => 'The book quantity must be at least 0.',

            'book_publisher.required' => 'The book publisher is required.',
            'book_publisher.string' => 'The book publisher must be a string.',
            'book_publisher.max' => 'The book publisher may not be greater than 255 characters.',

            'book_language.required' => 'The book language is required.',
            'book_language.string' => 'The book language must be a string.',
            'book_language.max' => 'The book language may not be greater than 255 characters.',

            'book_pages.required' => 'The book pages is required.',
            'book_pages.string' => 'The book pages must be a string.',
            'book_pages.min' => 'The book pages must be at least 1 character.',

            'book_isbn.required' => 'The book ISBN is required.',
            'book_isbn.string' => 'The book ISBN must be a string.',
            'book_isbn.max' => 'The book ISBN may not be greater than 255 characters.',
            'book_isbn.unique' => 'The book ISBN has already been taken.',
        ];
    }
}
