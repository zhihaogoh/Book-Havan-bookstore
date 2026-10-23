<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreImageBookRequest;
use App\Http\Resources\ImageBookResource;
use App\Models\Books;
use App\Models\Books_image;
use Illuminate\Http\Request;

class ImageBookController extends Controller
{
    public function store(StoreImageBookRequest $request, Books $book){

        $validated=$request->validated();
        $validated['book_id'] = $book->id;
        $imageBook = Books_image::create($validated);

        return response()->json([
            'message' => 'ImageBook created successfully',
            'data' => new ImageBookResource($imageBook)
        ], 201);
    }
    public function index(Books $book)
    {
        $imageBooks = Books_image::where('book_id', $book->id)->get();
        return response()->json([
            'message' => 'ImageBooks retrieved successfully',
            'data' => ImageBookResource::collection($imageBooks)
        ], 200);
    }
    public function destroy(Books $book ,string $id,){

        $imageBook = Books_image::where('book_id', $book->id)->findOrFail($id);

         if (!$imageBook) {
            return response()->json([
                'message' => 'Image Book not found'
            ], 404);
        }
        $imageBook->delete();
        return response()->json([
            'message' => 'Image Book deleted successfully'
        ], 200);
    }
}
