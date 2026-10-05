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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string("book_name");
            $table->string("book_author");
            $table->string("book_description");
            $table->decimal("book_price", 10, 2);
            $table->string("book_image");
            $table->integer("book_quantity")->default(0);
            $table->string("book_publisher");
            $table->string("book_language");
            $table->string("book_pages");
            $table->string("book_isbn")->unique();
            $table->foreignId("categories_id")->constrained("categories")->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
