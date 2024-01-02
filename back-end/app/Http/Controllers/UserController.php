<?php

namespace App\Http\Controllers;

use App\Models\ChatRoom;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;

class UserController extends Controller
{

    public function getCurrentUser(){
        $user = auth('sanctum')->user();

        return response()->json($user, 200);
    }

    public function signup(Request $request){
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed'
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        $chatRoom = ChatRoom::create([
            'user_id' => $user->id,
            'assistant_id' => "1",
            'is_active' => true
        ]);

        $message = Message::create([
            'chat_room_id' => $chatRoom->id,
            'user_id'=> $user->id,
            'assistant_id' => 1,
            'message' => "Halo, bersama dengan saya Assistant AI, ada yang bisa saya bantu?",
            'sender' => "assistant"

        ]);

        $token = $user->createToken('api_token')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];
        return response($response, 201);
    }

    public function login (Request $request){
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response([
                'message' => ['Email atau Password Salah!']
            ], 404);
        }

        $token = $user->createToken('api_token')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function logout (Request $request) {

        $accessToken = $request->bearerToken();

        $token = PersonalAccessToken::findToken($accessToken);

        $token->delete();

        return [
            'message' => 'Berhasil Log Out'
        ];

    }

}
