<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\NotepadController;
use App\Http\Controllers\AdminController;

// ─── Guest-only routes (redirect to /todo-list if already logged in) ───────────
// These routes are only accessible to users who are NOT logged in.
// If a logged-in user visits /login or /register, Laravel redirects them to /todo-list.
Route::middleware('guest')->group(function () {
    Route::inertia('/', 'Login');
    Route::inertia('/register', 'Register');

    Route::post("/register", [UserController::class, 'store']);
    Route::post("/Login", [UserController::class, 'login']);
});

// ─── Logout (auth users only — you must be logged in to log out) ─────────────
Route::post("/logout", [UserController::class, 'logout'])->middleware('auth');

// ─── Protected routes (redirect to / if NOT logged in) ────────────────────────
// The 'auth' middleware checks if the user has an active session.
// If not authenticated, Laravel automatically redirects them to the login page.
Route::middleware('auth')->group(function () {

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

    // Profile routes
    Route::get("/profile", [ProfileController::class, 'edit']);
    Route::patch("/profile", [ProfileController::class, 'update']);
});

// ─── Admin Routes (Requires both 'auth' and 'admin' middleware) ─────────────
Route::middleware(['auth', 'admin'])->group(function () {
    // Example: Admin Dashboard
    // Route::inertia("/dashboard", "Dashboard");
    Route::get("/dashboard", [AdminController::class, 'index']);
    Route::get("/users", [AdminController::class, 'users']);
    Route::delete("/users/{id}", [AdminController::class, 'destroy']);
});

