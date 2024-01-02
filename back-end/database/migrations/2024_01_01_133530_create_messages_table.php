<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('chat_room_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('assistant_id');
            $table->text('message');
            $table->timestamp('timestamp')->nullable();
            $table->timestamps();
            $table->string("sender");
            // Foreign keys definitions and other columns as needed
            $table->foreign('chat_room_id')->references('id')->on('chat_rooms');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('assistant_id')->references('id')->on('assistants');
        });
    }

    public function down()
    {
        Schema::dropIfExists('messages');
    }
};
