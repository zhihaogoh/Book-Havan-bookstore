<?php

namespace Tests\Feature;

use App\Models\Address;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CreateOrderTest extends TestCase
{
    use RefreshDatabase;

    public function test_creating_orders_assigns_unique_numbers_and_the_authenticated_user(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        Sanctum::actingAs($user);

        $address = Address::create([
            'user_id' => $user->id,
            'recipient_name' => 'Test Customer',
            'recipent_phone' => '0123456789',
            'address_1' => '1 Test Street',
            'address_2' => '',
            'city' => 'Kuala Lumpur',
            'state' => 'Kuala Lumpur',
            'postal_code' => '50000',
            'country' => 'Malaysia',
            'status' => true,
        ]);

        $numbers = [];
        foreach ([1, 2] as $count) {
            $response = $this->postJson('/api/orders', [
                'user_id' => $otherUser->id,
                'order_number' => 'CLIENT-NUMBER',
                'address_id' => $address->id,
                'status' => 'pending',
                'currency' => 'MYR',
                'subtotal' => 25,
                'grand_total' => 25,
            ])->assertCreated()->assertJsonPath('order.user_id', $user->id);

            $id = $response->json('order.id');
            $number = 'PO'.str_pad((string) $id, 3, '0', STR_PAD_LEFT);
            $response->assertJsonPath('order.order_number', $number);
            $this->assertNotContains($number, $numbers);
            $numbers[] = $number;
            $this->assertDatabaseCount('orders', $count);
            $this->assertDatabaseHas('orders', [
                'id' => $id,
                'user_id' => $user->id,
                'order_number' => $number,
                'address_id' => $address->id,
                'status' => 'pending',
            ]);
        }
    }
}
