<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use OpenAI\Laravel\Facades\OpenAI;

class AssistantController extends Controller
{
    public function answer($userMessage){
        $result = OpenAI::chat()->create([
            'model' => 'gpt-3.5-turbo-1106',
            'messages' => [
                [
                    'role' => 'user',
                    'content' => $userMessage->message
                ],
            ],
        ]);

        $answer = $result->choices[0]->message->content;
        $this->saveAnswer($userMessage, $answer);

        return $answer;
    }

    function saveAnswer($userMessage, $answer){
        $message = new Message();
        $message->chat_room_id = $userMessage->chat_room_id;
        $message->user_id = $userMessage->user_id;
        $message->assistant_id = $userMessage->assistant_id;
        $message->message = $answer;
        $message->sender = "assistant";
        $message->save();
    }
}
