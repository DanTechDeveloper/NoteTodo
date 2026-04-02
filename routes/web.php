<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\NotepadController;

Route::inertia('/', 'Login');
Route::inertia('/register', 'Register');

Route::post("/register", [UserController::class, 'store']);
Route::post("/Login", [UserController::class, 'login']);
Route::post("/logout", [UserController::class, 'logout']);

// Todos routes
Route::post('/todos', [TodoController::class, 'store']);
Route::get('/todo-list', [TodoController::class, 'index']);
Route::put("/todos/{id}", [TodoController::class, 'update']);
Route::patch("/todos/{id}/toggle", [TodoController::class, 'toggle']);
Route::delete("/todos/{id}", [TodoController::class, 'destroy']);

// Notepad routes
Route::post("/notepad", [NotepadController::class, 'store']);
Route::get("/notepad", [NotepadController::class, 'index']);
Route::put("/notepad/{id}", [NotepadController::class, 'update']);
Route::delete("/notepad/{id}", [NotepadController::class, 'destroy']);