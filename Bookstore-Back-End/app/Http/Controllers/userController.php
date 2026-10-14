<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class userController extends Controller
{

    public function Register(StoreUserRequest $request)
    {
         $validated=$request->validated();

        $user_role = $validated['user_role'] ?? 'user';
        $user =User::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone_number' => $validated['phone_number'] ?? null,
            'gender' => $validated['gender'] ?? null,
            'date_of_birth' => $validated['date_of_birth'] ?? null,
            'user_role' => $user_role,
        ]);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => new UserResource($user),
        ], 201);

    }

    public function Login(Request $request)
    {
        $login=$request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);


        if(!Auth::attempt($login)){

            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }
        $user = User::where('email', $request->email)->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        $user->update([
            'token' => $token,
        ]);

        return response()->json([
            'message' => 'User logged in successfully',
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function Logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        $request->user()->update([
            'token' => null,
        ]);

        return response()->json([
            'message' => 'User logged out successfully',
        ]);
    }
}
