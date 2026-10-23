<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderItemRequest;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderItemController extends Controller
{
    public function index()
    {
        $orderItems = OrderItem::with(['order', 'book'])->get();

        return response()->json([
            'message' => 'Order items retrieved successfully',
            'orderItems' => $orderItems
        ], 200);
    }

    public function store(StoreOrderItemRequest $request)
    {

        $validated = $request->validated();
        $validated['subtotal'] = ($validated['price_per_unit'] * $validated['quantity']) - $validated['discount_amount'] + $validated['tax_amount'];
        $orderItem = OrderItem::create($validated);
        return response()->json([
            'message' => 'Order item created successfully',
            'orderItem' => $orderItem
        ], 201);
    }
}
