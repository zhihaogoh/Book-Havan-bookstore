<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Models\Address;
use App\Models\Orders;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

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

        $order = DB::transaction(function () use ($validated) {
            $validated['order_number'] = (string) Str::uuid();

            $order = Orders::create($validated);
            $order->update([
                'order_number' => 'PO' . str_pad(
                    (string) $order->id,
                    3,
                    '0',
                    STR_PAD_LEFT
                ),
            ]);
            return $order;
        });
        return response()->json([
            'message' => 'Order created successfully',
            'order' => $order
        ], 201);
    }
}
