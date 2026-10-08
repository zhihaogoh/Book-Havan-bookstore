<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoriesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('books',[BookController::class,'index']);
Route::get('books/{id}',[BookController::class,'show']);
Route::post('books',[BookController::class,'store']);
Route::put('books/{id}',[BookController::class,'update']);
Route::delete('books/{id}',[BookController::class,'destroy']);


Route::get('categories',[CategoriesController::class, 'index']);
Route::get('categories/{id}', [CategoriesController::class, 'show']);
Route::post('categories', [CategoriesController::class, 'store']);
Route::put('categories/{id}', [CategoriesController::class, 'update']);
Route::delete('categories/{id}', [CategoriesController::class, 'destroy']);
