<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('wishlist_item', function (Blueprint $table) {
            $table->id();
            $table->foreignId('wishlist_id')
            ->constrained('wishlist')
            ->onDelete('cascade');
            $table->foreignId('book_id')
            ->constrained('books')
            ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wishlist_item');
    }
};
