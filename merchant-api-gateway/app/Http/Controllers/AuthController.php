<?php

namespace App\Http\Controllers;

use App\Models\Merchant;
use Illuminate\Http\Request;

require_once base_path('data/constants.php');

use Data\Constants\StatusCode;
use Illuminate\Support\Facades\Hash;

require_once base_path('utils/response.php');

use Utils\Response\ResponseObject;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'first_name' => ['required', 'max:50', 'min:3'],
            'last_name' => ['required', 'max:50', 'min:3'],
            'email' => ['required', 'email'],
            'number' => ['required', 'max:15', 'min:9'],
            'password' => ['required', 'max:25', 'min:7'],
            'company_name' => ['required', 'max:50'],
        ]);
        if (Merchant::query()->where('email', $request->email)->exists()) {
            return response()->json(ResponseObject::validationError([
                'gmail' => ["Given email already exist, please try another one"]
            ]), StatusCode::$VALIDATION_ERROR);
        }
        if ($request->password != $request->c_password) {
            return response()->json(ResponseObject::validationError([
                'c_password' => ["Password and confirm password doesn't match"]
            ]), StatusCode::$VALIDATION_ERROR);
        }
        $merchant = new Merchant();
        $merchant->f_name = $request->first_name;
        $merchant->l_name = $request->last_name;
        $merchant->email = $request->email;
        $merchant->number = $request->number;
        $merchant->company_name = $request->company_name;
        $merchant->password = Hash::make($request->password);
        if ($merchant->save()) {
            return response()->json(ResponseObject::successResponse("Successfully register a new user"), StatusCode::$CREATED);
        }
        return response()->json(ResponseObject::failResponse(), StatusCode::$INTERNAL_SERVER_ERROR);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $merchant = Merchant::where('email', $request->email)->first();
        if ($merchant && Hash::check($request->password, $merchant->password)) {
            $token = $merchant->createToken($request->email)->plainTextToken;
            return response(ResponseObject::successResponse("Successfully Logged in", ['token' => $token]), StatusCode::$OK);
        }
        return response()->json(ResponseObject::failResponse("given credentials doesn't exist"), StatusCode::$UNAUTHORIZED);
    }
}
