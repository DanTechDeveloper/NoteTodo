<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        // 'auth' middleware: where to redirect unauthenticated users (guests trying to access protected pages)
        $middleware->redirectGuestsTo('/');

        // 'guest' middleware: where to redirect already-logged-in users (trying to visit login/register)
        $middleware->redirectUsersTo('/todo-list');
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
