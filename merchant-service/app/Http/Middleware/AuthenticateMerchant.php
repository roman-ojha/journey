<?php

namespace App\Http\Middleware;

use Closure;
use Data\Constants\StatusCode;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Utils\Response\ResponseObject;

class AuthenticateMerchant
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user || (!$request->user['email'] && !$request->user['id'])) {
            return response()->json(ResponseObject::failResponse("Unauthorized merchant, please login first"), StatusCode::$UNAUTHORIZED);
        } else
            return $next($request);
    }
}
