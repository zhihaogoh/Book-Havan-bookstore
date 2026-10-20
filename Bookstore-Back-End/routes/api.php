<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\userController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/register', [userController::class, 'Register']);
Route::post('/login', [userController::class, 'Login']);


Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [userController::class, 'Logout']);

    Route::get('/address',[AddressController::class,'index']);
    Route::post('/address',[AddressController::class, 'store']);
    Route::delete('/address/{id}', [AddressController::class, 'destroy']);
    Route::put('/address/{id}', [AddressController::class, 'update']);
});

Route::post('author',[AuthorController::class, 'store']);
Route::put('author/{id}',[AuthorController::class, 'update']);
Route::delete('author/{id}',[AuthorController::class, 'destroy']);


Route::get('categories', [CategoriesController::class, 'index']);
Route::get('categories/{id}', [CategoriesController::class, 'show']);
Route::post('categories', [CategoriesController::class, 'store']);
Route::put('categories/{id}', [CategoriesController::class, 'update']);
Route::delete('categories/{id}', [CategoriesController::class, 'destroy']);

Route::get('books', [BookController::class, 'index']);
Route::get('books/{id}', [BookController::class, 'show']);
Route::post('books', [BookController::class, 'store']);
Route::put('books/{id}', [BookController::class, 'update']);
Route::delete('books/{id}', [BookController::class, 'destroy']);

Route::get('orders', [OrderController::class, 'index']);
