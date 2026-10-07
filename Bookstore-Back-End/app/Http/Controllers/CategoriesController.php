<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    public function index()
    {
        return Category::all();
    }

    public function show($id){
        $category = Category::find($id);
        if(!$category){
            return response() ->json([
                'message' => 'Category not found'
            ], 404);
        }
        return response() ->json([
            'message' => 'Category found',
            'category' => $category
        ], 200);
    }

    public function store(Request $request){
        $book = Category::create($request->all());
        if(!$book){
            return response()->json([
                'message' => 'Category creation failed'
            ], 500);
        }
        return response()->json([
            'message' => 'Category created successfully',
            'category' => $book
        ], 201);
    }
}
