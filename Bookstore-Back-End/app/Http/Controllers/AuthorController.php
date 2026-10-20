<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAuthorRequest;
use App\Http\Requests\UpdateAuthorRequest;
use App\Http\Resources\AuthorResource;
use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function store(StoreAuthorRequest $request){
        $validated = $request->validated();

        $author = Author::create($validated);
        if(!$author){
            return response()->json([
                'message' => 'Author creation failed'
            ],500);
        }
        return response()->json([
                'message' => 'Author created successfully',
                'author' => new AuthorResource($author)
        ]);
    }

     public function update(UpdateAuthorRequest $request, string $id)
    {
        $author = Author::find($id);
        if (!$author) {
            return response()->json([
                'message' => 'Book not found',
            ], 404);
        }

        $validated = $request->validated();

        $author->update($validated);
        return response()->json([
            'message' => 'Author updated successfully',
            'author' => new AuthorResource($author)
        ], 200);
    }
    public function destroy(string $id)
    {
        $author = Author::find($id);
        if (!$author) {
            return response()->json([
                'message' => 'Book not found'
            ], 404);
        }
        $author->delete();
        return response()->json([
            'message' => 'Book deleted successfully'
        ], 200);
    }

}
