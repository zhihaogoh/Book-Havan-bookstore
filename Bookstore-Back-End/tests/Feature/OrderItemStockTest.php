<?php

namespace Tests\Feature;

use App\Models\Books;
use App\Models\Orders;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class OrderItemStockTest extends TestCase
{
    use RefreshDatabase;

    private Orders $order;
    private Books $book;

    protected function setUp(): void
    {
        parent::setUp();
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $this->order = Orders::create(['user_id' => $user->id, 'order_number' => 'TEST-1']);
        $this->book = Books::create([
            'book_name' => 'Test book',
            'author_id' => DB::table('authors')->insertGetId(['author_name' => 'Author', 'author_bio' => 'Bio']),
            'categories_id' => DB::table('categories')->insertGetId(['categories_name' => 'Books', 'slug' => 'books']),
            'book_description' => 'Description',
            'book_price' => 10,
            'book_quantity' => 10,
            'stock_on_hand' => 10,
            'stock_reserved' => 2,
            'book_publisher' => 'Publisher',
            'book_language' => 'English',
            'book_pages' => '100',
            'book_isbn' => '1234567890',
        ]);
    }

    private function item(int $quantity): array
    {
        return ['book_id' => $this->book->id, 'quantity' => $quantity,
            'title_book' => 'Test book', 'SKU' => 'TEST', 'price_per_unit' => 10];
    }

    public function test_adding_and_appending_items_deducts_only_the_new_quantity(): void
    {
        foreach ([5, 3] as $quantity) {
            $this->postJson('/api/order-item', [
                'order_id' => $this->order->id, 'items' => [$this->item($quantity)],
            ])->assertCreated();
        }

        $this->assertDatabaseHas('books', ['id' => $this->book->id,
            'book_quantity' => 2, 'stock_on_hand' => 2, 'stock_reserved' => 2]);
        $this->assertDatabaseCount('order_item', 1);
        $this->assertDatabaseHas('order_item', ['order_id' => $this->order->id, 'quantity' => 8]);
    }

    public function test_insufficient_stock_rolls_back_the_entire_batch(): void
    {
        $this->postJson('/api/order-item', [
            'order_id' => $this->order->id, 'items' => [$this->item(5), $this->item(4)],
        ])->assertUnprocessable()->assertJsonValidationErrors('items.1.quantity');

        $this->assertDatabaseHas('books', ['id' => $this->book->id,
            'book_quantity' => 10, 'stock_on_hand' => 10]);
        $this->assertDatabaseCount('order_item', 0);
        $this->assertEquals(0, $this->order->fresh()->grand_total);
    }

    public function test_book_quantity_also_limits_available_stock(): void
    {
        $this->book->update(['book_quantity' => 1]);
        $this->postJson('/api/order-item', [
            'order_id' => $this->order->id, 'items' => [$this->item(2)],
        ])->assertUnprocessable()->assertJsonValidationErrors('items.0.quantity');
        $this->assertDatabaseCount('order_item', 0);
        $this->assertEquals(1, $this->book->fresh()->book_quantity);
    }

    public function test_cancelling_restores_stock_only_once_and_prevents_new_items(): void
    {
        $this->postJson('/api/order-item', [
            'order_id' => $this->order->id, 'items' => [$this->item(3)],
        ])->assertCreated();

        $url = '/api/orders/'.$this->order->id.'/status';
        $this->postJson($url, ['status' => 'cancelled'])
            ->assertOk()->assertJsonPath('data.status', 'cancelled');
        $this->assertDatabaseHas('books', ['id' => $this->book->id,
            'book_quantity' => 10, 'stock_on_hand' => 10, 'stock_reserved' => 2]);

        $this->postJson($url, ['status' => 'cancelled'])->assertUnprocessable();
        $this->postJson('/api/order-item', [
            'order_id' => $this->order->id, 'items' => [$this->item(1)],
        ])->assertUnprocessable();
        $this->assertDatabaseHas('books', ['id' => $this->book->id,
            'book_quantity' => 10, 'stock_on_hand' => 10]);
    }

    public function test_cancelling_another_users_order_does_not_restore_stock(): void
    {
        $this->postJson('/api/order-item', [
            'order_id' => $this->order->id, 'items' => [$this->item(3)],
        ])->assertCreated();
        Sanctum::actingAs(User::factory()->create());
        $this->postJson('/api/orders/'.$this->order->id.'/status', ['status' => 'cancelled'])
            ->assertNotFound();
        $this->assertDatabaseHas('books', ['id' => $this->book->id,
            'book_quantity' => 7, 'stock_on_hand' => 7]);
        $this->assertEquals('pending', $this->order->fresh()->status);
    }
}
