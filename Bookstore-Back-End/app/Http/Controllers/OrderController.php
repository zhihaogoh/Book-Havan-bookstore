<?php

namespace App\Http\Controllers;

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

}
