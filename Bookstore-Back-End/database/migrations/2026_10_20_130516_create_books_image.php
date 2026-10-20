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
        Schema::create('books_image', function (Blueprint $table) {
            $table->id();
            $table->foreignId("book_id")
            ->constrained("books")
            ->onDelete("cascade");
            $table->string("path");
            $table->string("alt_text")->nullable();
            $table->integer("sort_order");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books_image');
    }
};
