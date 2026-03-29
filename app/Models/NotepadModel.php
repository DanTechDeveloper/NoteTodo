<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class NotepadModel extends Model
{
    protected $table = "notepaddb";
    protected $fillable = ["title", "content"];

    public function notepad(){
        return $this->belongsTo(User::class);
    }
    //
}
