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
    public function check(Request $request)
    {
        return response(['user' => auth()->user()]);
    }
}
