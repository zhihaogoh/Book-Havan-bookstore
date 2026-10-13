<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Http\Resources\BookResource;
use App\Models\Books;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {
        $books = Books::paginate(10);
        return BookResource::collection($books);
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
            'book' => new BookResource($book)
        ], 200);


        }

    public function store(StoreBookRequest $request)
    {

        $validated = $request->validated();



        $book = Books::create($validated);
        if (!$book) {
            return response()->json([
                'message' => 'Book creation failed'
            ], 500);
        }
        return response()->json([
            'message' => 'Book created successfully',
            'book' => new BookResource($book)
        ], 201);
    }

    public function update(UpdateBookRequest $request, $id)
    {


        $book = Books::find($id);
        if (!$book) {
            return response()->json([
                'message' => 'Book not found',
            ], 404);
        }

        $validated = $request->validated();

        $book->update($validated);
        return response()->json([
            'message' => 'Book updated successfully',
            'book' => new BookResource($book)
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
