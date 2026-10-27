<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\TransientToken;

class userController extends Controller
{

    public function Register(StoreUserRequest $request)
    {
         $validated=$request->validated();

        $validated['user_role'] = $validated['user_role'] ?? 'user';
        $user =User::create($validated);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => new UserResource($user),
        ], 201);

    }

    public function Login(LoginRequest $request)
    {
        $login=$request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);


        if(!Auth::attempt($login)){

            return response()->json([
                'message' => 'Invalid email or password',
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

    public function getUser(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'user' => new UserResource($user),
            'token' => $request->bearerToken(),
        ]);
    }

    public function Logout(Request $request)
    {
        $user = $request->user();
        $token = $user->currentAccessToken();

        if ($token instanceof TransientToken) {
            Auth::guard('web')->logout();

            if ($request->hasSession()) {
                $request->session()->invalidate();
                $request->session()->regenerateToken();
            }
        } else {
            $token?->delete();
        }

        $user->update([
            'token' => null,
        ]);

        return response()->json([
            'message' => 'User logged out successfully',
        ]);
    }
}
