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

    public function show($id){
        $book = Books::find($id);
        if(!$book){
            return response() ->json([
                'message' => 'Book not found'
            ], 404);
        }
        return response() ->json([
            'message' => 'Book found',
            'book' => $book
        ], 200);
    }

    public function store(Request $request){
        $book = Books::create($request->all());
        if(!$book){
            return response()->json([
                'message' => 'Book creation failed'
            ], 500);
        }
        return response()->json([
            'message' => 'Book created successfully',
            'book' => $book
        ], 201);
    }

    public function update(Request $request, $id){
        $book = Books::find($id);
        if(!$book){
            return response() -> json([
                'message' => 'Book not found',
            ], 404);
        }
        $book->update($request->all());
        return response() -> json([
            'message' => 'Book updated successfully',
            'book' => $book
        ], 200);}

    public function destroy($id){
        $book = Books::find($id);
        if(!$book){
            return response() -> json([
                'message' => 'Book not found'
            ], 404);
        }
        $book->delete();
        return response() -> json([
            'message' => 'Book deleted successfully'
        ], 200);
    }
}
