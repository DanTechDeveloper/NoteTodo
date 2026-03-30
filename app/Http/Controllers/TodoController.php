<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TodoModel;
use Inertia\Inertia;
class TodoController extends Controller
{
    public function store(Request $request){


       $validated =  $request->validate([
            'title' => 'required',
            'description' => 'nullable',
            'status' => 'required',
        ]);

        $request->user()->todos()->create($validated);
        return redirect()->back();        
    }   
    
    public function index(Request $request){
        $todos = $request->user()
        ->todos()
        ->latest()
        ->paginate(5);

    return Inertia::render('TodoList', [
            'todos' => $todos,
        ]);
    }

    public function update(Request $request)
{
    $todo = TodoModel::findOrFail($request->id);

    $validated = $request->validate([
        "title" => 'required|string',
        "description" => 'nullable|string',
        "status" => 'required|string',
    ]);

    $todo->update($validated);

    return redirect()->back();
}

public function toggle(Request $request) {
    $todo = TodoModel::findOrFail($request->id);
    $todo->update([
        'isCompleted' => $request->isCompleted,
    ]);
    return redirect()->back();
}

public function destroy($id)
{
    $todo = TodoModel::findOrFail($id);
    $todo->delete();

    return redirect()->back();
}
}
