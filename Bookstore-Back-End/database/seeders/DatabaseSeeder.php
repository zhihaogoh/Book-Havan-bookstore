<?php

namespace Database\Seeders;

use App\Models\Books;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(['email' => 'test@example.com'], [
            'first_name' => 'Test',
            'last_name' => 'User',
            'password' => 'password',
            'email' => 'test@example.com',
        ],
        );
         $users = [
            [
                'first_name' => 'ABC',
                'last_name' => 'abc',
                'email' => 'Abc@gmail.com',
                'password' => 'Abc@12345',
            ],
            [
                'first_name' => 'DEF',
                'last_name' => 'def',
                'email' => 'Def@gmail.com',
                'password' => 'Def@12345',
            ]
        ];


        $categories = [
            [
                'categories_name' => 'Fiction',
                'slug' => 'fiction'
            ],
            [
                'categories_name' => 'Non Fiction',
                'slug' => 'non fiction'
            ],
            [
                'categories_name' => 'Rommace',
                'slug' => 'rommace'
            ],
            [
                'categories_name' => 'History',
                'slug' => 'history'
            ]
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(['slug' => $category['slug']], $category);
        }
;

        $books = [
            [
                'book_name' => 'Atomic Habits',
                'book_author' => 'James Clear',
                'book_publisher' => 'Avery',
                'book_description' => 'A book about building good habits.',
                'book_price' => 59.90,
                'book_pages' => '320 Pages',
                'book_language' => 'English',
                'book_quantity' => 100,
                'book_isbn' => '9780735211292',
                'categories_id' => 1
            ],
            [
                'book_name' => 'The Psychology of Money',
                'book_author' => 'Morgan Housel',
                'book_publisher' => 'Harriman House',
                'book_description' => 'A book about money and human behaviour.',
                'book_price' => 49.90,
                'book_pages' => '256 pages',
                'book_language' => 'English',
                'book_quantity' => 10,
                'book_isbn' => '9780857197689',
                'categories_id' => 2
            ],
            [
                'book_name' => 'The Subtle Art of Not Giving a F*ck',
                'book_author' => 'Mark Manson',
                'book_publisher' => 'Harper',
                'book_description' => 'A book about living a better life by caring less.',
                'book_price' => 39.90,
                'book_pages' => '224 pages',
                'book_language' => 'English',
                'book_quantity' => 10,
                'book_isbn' => '9780062457714',
                'categories_id' => 3
            ],
            [
                'book_name' => 'The 7 Habits of Highly Effective People',
                'book_author' => 'Stephen R. Covey',
                'book_publisher' => 'Free Press',
                'book_description' => 'A book about personal and professional effectiveness.',
                'book_price' => 69.90,
                'book_pages' => '384 pages',
                'book_language' => 'English',
                'book_quantity' => 100,
                'book_isbn' => '9780743269513',
                'categories_id' => 4
            ],
            [
                'book_name' => 'Thinking, Fast and Slow',
                'book_author' => 'Daniel Kahneman',
                'book_publisher' => 'Farrar, Straus and Giroux',
                'book_description' => 'A book about the two systems of thinking.',
                'book_price' => 79.90,
                'book_pages' => '512 pages',
                'book_language' => 'English',
                'book_quantity' => 100,
                'book_isbn' => '9780743269153',
                'categories_id' => 2
            ]
        ];


        foreach ($users as $user) {
            User::firstOrCreate(['email' => $user['email']], $user);
        }

        foreach ($books as $book) {
            Books::updateOrCreate(['book_isbn' => $book['book_isbn']], $book);
        }
    }
}

