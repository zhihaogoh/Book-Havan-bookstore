<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Models\Address;
use App\Models\Orders;
use Illuminate\Http\Request;

class OrderController extends Controller
{

    public function index()
    {
        $orders = Orders::with(['user', 'orderItems.book'])->get();

        return response()->json([
            'message' => 'Orders retrieved successfully',
            'orders' => $orders
        ], 200);
    }
    public function store(StoreOrderRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = $request->user()->id;
        $validated['placed_at'] = now();

        $order = Orders::create($validated);

        return response()->json([
            'message' => 'Order created successfully',
            'order' => $order
        ], 201);
    }
}
