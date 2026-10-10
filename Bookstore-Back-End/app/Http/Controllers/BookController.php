<?php

namespace App\Http\Controllers;

use App\Models\Books;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {
        return Books::all();
    }

    public function show($id)
    {
        $book = Books::find($id);
        if (!$book) {
            return response()->json([
                'message' => 'Book not found'
            ], 404);
        }
        return response()->json([
            'message' => 'Book found',
            'book' => $book
        ], 200);
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
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
        ]);



        $book = Books::create($validated);
        if (!$book) {
            return response()->json([
                'message' => 'Book creation failed'
            ], 500);
        }
        return response()->json([
            'message' => 'Book created successfully',
            'book' => $book
        ], 201);
    }

    public function update(Request $request, $id)
    {


        $book = Books::find($id);
        if (!$book) {
            return response()->json([
                'message' => 'Book not found',
            ], 404);
        }

        $validated = $request->validate([
            'book_name' => 'sometimes|required|string|max:255|unique:books,book_name,' . $book->id,
            'book_author' => 'sometimes|required|string|max:255',
            'book_description' => 'sometimes|required|string',
            'book_price' => 'sometimes|required|numeric|min:0',
            'book_image' => 'sometimes|required|string|max:255',
            'book_quantity' => 'sometimes|required|integer|min:0',
            'book_publisher' => 'sometimes|required|string|max:255',
            'book_language' => 'sometimes|required|string|max:255',
            'book_pages' => 'sometimes|required|string|min:1',
            'book_isbn' => 'sometimes|required|string|max:255|unique:books,book_isbn,' . $book->id,
            'categories_id' => 'sometimes|required|integer|exists:categories,id',
        ]);

        $book->update($validated);
        return response()->json([
            'message' => 'Book updated successfully',
            'book' => $book
        ], 200);
    }

    public function destroy($id)
    {
        $book = Books::find($id);
        if (!$book) {
            return response()->json([
                'message' => 'Book not found'
            ], 404);
        }
        $book->delete();
        return response()->json([
            'message' => 'Book deleted successfully'
        ], 200);
    }
}
