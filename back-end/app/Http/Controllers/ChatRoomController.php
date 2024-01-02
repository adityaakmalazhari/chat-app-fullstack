<?php

namespace App\Http\Controllers;

use App\Models\ChatRoom;
use App\Models\User;
use Illuminate\Http\Request;

class ChatRoomController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Chatroom tidak ditemukan'], 404);
        }

        $chatrooms = ChatRoom::whereHas('user', function ($query) use ($user) {
            $query->where('id', $user->id);
        })->with(['user', 'assistant'])->get();

        return response()->json(['chatrooms' => $chatrooms]);
    }
    // Contoh untuk menampilkan percakapan tertentu
    public function show($id)
    {
        $chatRoom = ChatRoom::with('messages')->find($id);

        if (!$chatRoom) {
            return response()->json(['message' => 'ChatRoom not found'], 404);
        }

        $messages = $chatRoom->messages()->orderBy('created_at')->get();

        return response()->json(['messages' => $messages]);
    }
}
