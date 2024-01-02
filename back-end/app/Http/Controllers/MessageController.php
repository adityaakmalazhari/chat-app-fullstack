<?php

namespace App\Http\Controllers;

use App\Models\ChatRoom;
use App\Models\Message;
use Illuminate\Http\Request;
use App\Http\Controllers\AssistantController;

class MessageController extends Controller
{
    protected $assistantController;

    public function __construct(AssistantController $assistantController) {
        $this->assistantController = $assistantController;
    }

    public function store(Request $request)
    {
        $chatRoom = ChatRoom::find($request->input('chat_room_id'));

        if (!$chatRoom) {
            return response()->json(['message' => 'ChatRoom not found'], 404);
        }

        $userMessage = $this->saveUserMessage($request);

        if($userMessage){
            $answer = $this->assistantController->answer($userMessage);
            return response()->json($userMessage, 200);

        } else{
            return response()->json(['error' => 'Gagal mengirim pesan'], 400);
        }



    }

    function saveUserMessage(Request $request){
        $request->validate([
            'chat_room_id' => 'required',
            'user_id' => 'required',
            'assistant_id' => 'required',
            'message' => 'required',
            'sender' => 'required'
        ]);

        $message = new Message();
        $message->chat_room_id = $request->input('chat_room_id');
        $message->user_id = $request->input('user_id');
        $message->assistant_id = $request->input('assistant_id');
        $message->message = $request->input('message');
        $message->sender = $request->input('sender');
        $message->save();

        return $message;
    }
}
