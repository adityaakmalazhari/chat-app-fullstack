<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatRoom extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'assistant_id', 'is_active'];

    // Relasi dengan user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi dengan assistant
    public function assistant()
    {
        return $this->belongsTo(Assistant::class);
    }

    // Relasi dengan pesan
    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
