<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class TodoModel extends Model
{
    protected $table = 'TodoListMigration';
    protected $fillable = ["title", "description", "status", "isCompleted"];

    public function user() {
        return $this->belongsTo(User::class);
    }
}


