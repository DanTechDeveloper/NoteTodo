<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\NotepadController;

Route::inertia('/', 'Login');
Route::inertia("/todo-list", "TodoList");
Route::inertia('/register', 'Register');


Route::post("/register", [UserController::class, 'store']);
Route::post("/Login", [UserController::class, 'login']);

Route::post('/todos', [TodoController::class, 'store']);
Route::get("/todo-list", [TodoController::class, 'index']);

Route::put("/todos/{id}", [TodoController::class, 'update']);
Route::patch("/todos/{id}/toggle", [TodoController::class, 'toggle']);
Route::delete("/todos/{id}", [TodoController::class, 'destroy']);

Route::post("/notepad", [NotepadController::class, 'store']);
Route::get("/notepad-list", [NotepadController::class, 'index']);

Route::put("/notepad/{id}", [NotepadController::class, 'update']);
Route::delete("/notepad/{id}", [NotepadController::class, 'destroy']);


                            