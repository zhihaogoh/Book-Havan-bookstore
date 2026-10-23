<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    public function index()
    {
        return Category::all();
    }

    public function show(string $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json([
                'message' => 'Category not found'
            ], 404);
        }
        return response()->json([
            'message' => 'Category found',
            'category' => $category
        ], 200);
    }

    public function store( StoreCategoryRequest $request)
    {

        $validated = $request->validated();

        $book = Category::create($validated);

        if (!$book) {
            return response()->json([
                'message' => 'Category creation failed'
            ], 500);
        }
        return response()->json([
            'message' => 'Category created successfully',
            'category' => $book
        ], 201);
    }

    public function update(UpdateCategoryRequest $request, string $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'message' => 'Category not found'
            ], 404);
        }

        $validated = $request->validated();

        $category->update($validated);
        return response()->json([
            'message' => 'Category updated successfully',
            'category' => $category
        ], 200);
    }

    public function destroy(string $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json([
                'message' => 'Category not found'
            ], 404);
        }
        $category->delete();
        return response()->json([
            'message' => 'Category deleted successfully'
        ], 200);
    }
}
