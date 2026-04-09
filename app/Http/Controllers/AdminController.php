<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use App\Models\TodoModel;
use App\Models\NotepadModel;

class AdminController extends Controller
{
    public function store(Request $request){
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'admin',
        ]);

        Auth::login($user);

        return redirect()->back();
    }
    public function index(){
        return Inertia::render("Dashboard", [
            "totalRegularUsers" => User::where('role', 'user')->count(),
            "totalAdmins" => User::where('role', 'admin')->count(),
            "totalTodos" => TodoModel::count(),
            "totalNotes" => NotepadModel::count(),
        ]);
    }
    public function users(){
        return Inertia::render("Users", [
            "users" => User::where('role', 'user')->get(),
        ]);
    }
}
