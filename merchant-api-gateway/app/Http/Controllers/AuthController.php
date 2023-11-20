<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
require_once base_path('data/constants.php');
use Data\Constants\StatusCode;

class AuthController extends Controller
{
    public function register(Request $request){
        $request->validate([
            'first_name'=>['required','max:50','min:3'],
            'last_name'=>['required','max:50','min:3'],
            'email'=>['required','email'],
            'number'=>['required','max:15','min:9'],
            'password'=>['required','max:25','min:7'],
            'company_name'=>['required','max:50'],
        ]);
        return ['msg'=>StatusCode::$OK];
    }
}
