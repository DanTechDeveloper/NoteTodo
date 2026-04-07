<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;


class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if user is logged in and is an admin
        if (Auth::check() && Auth::user()->role === 'admin') {
            return $next($request);
        }

        // Return a 403 Forbidden response if they are not an admin
        abort(403, 'Unauthorized. Admin access required.');
    }
}
