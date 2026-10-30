<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAddressRequest;
use App\Http\Requests\UpdateAddressRequest;
use App\Http\Resources\AddressResource;
use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function index(Request $request){
        $address = Address::where ('user_id',$request->user()->id)->paginate(3);
        return response()->json([
            'message' => 'Addresses retrieved successfully',
            'addresses' => AddressResource::collection($address)
        ]);
    }
    public function store(StoreAddressRequest $request){
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;

        $address = Address::create($data);
        if(!$address){
            return response()->json([
                'message' => 'Address creation failed'
            ], 500);
        }
        return response()->json([
            'message' => 'Address created successfully',
            'address' => new AddressResource($address)
        ], 201);
    }

    public function update(UpdateAddressRequest $request, string $id){
        $address = Address::where('user_id', $request->user()->id)
                ->find($id);

        if(!$address){
             return response()->json([
                'message' => 'Address not found',
            ], 404);
        }
        $validated = $request->validated();
        $address->update($validated);
        return response() -> json([
            'message' => 'Address updated successfully',
            'address' => new AddressResource($address)
        ]);

    }

    public function destroy(Request $request, string $id){
        $address = Address::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $address->delete();

        return response()->json([
            'message' => 'Address deleted successfully'
        ]);
    }
}
