<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'Aditya',
            'email' => 'adit@adit.com',
            'password' => Hash::make('password')
        ]
    );
        DB::table('users')->insert(
        [
            'name' => 'Akmal',
            'email' => 'akmal@akmal.com',
            'password' => Hash::make('password')
        ]
    );
        DB::table('users')->insert(
        [
            'name' => 'Azhari',
            'email' => 'azhari@azhari.com',
            'password' => Hash::make('password')
        ]
    );
        DB::table('users')->insert(
        [
            'name' => 'John Doe',
            'email' => 'john@doe.com',
            'password' => Hash::make('password')
        ]
    );
        DB::table('assistants')->insert(
        [
            'name' => 'Assistant AI',
            'description' => 'Virtual Assistant AI'
        ]
    );
    DB::table('chat_rooms')->insert(
        [
            'user_id' => '1',
            'assistant_id' => '1',
            'is_active' => true
        ]
    );
    DB::table('messages')->insert(
        [
            'chat_room_id' => '1',
            'user_id' => '1',
            'assistant_id' => '1',
            'message' => 'test test test test',
            'sender'=>'user',
            'timestamp' => Carbon::now()
        ]
    );

    usleep(1000000);

    DB::table('messages')->insert(
        [
            'chat_room_id' => '1',
            'user_id' => '1',
            'assistant_id' => '1',
            'message' => 'tost tost tost tost',
            'sender'=> 'assistant',
            'timestamp' => Carbon::now()
        ]
    );

    usleep(1000000);

    DB::table('messages')->insert(
        [
            'chat_room_id' => '1',
            'user_id' => '1',
            'assistant_id' => '1',
            'message' => 'tost tost tost tost',
            'sender'=> 'assistant',
            'timestamp' => Carbon::now()
        ]
    );

    usleep(1000000);

    DB::table('messages')->insert(
        [
            'chat_room_id' => '1',
            'user_id' => '1',
            'assistant_id' => '1',
            'message' => 'tost tost tost tost',
            'sender'=> 'user',
            'timestamp' => Carbon::now()
        ]
    );
    }
}
