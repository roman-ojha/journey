<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

require_once base_path('data/constants.php');
require_once base_path('utils/response.php');
require_once base_path('config/gcpStorage.php');

use Data\Constants\StatusCode;
use Utils\Response\ResponseObject;
use Config\GCPCloudStorage\CloudStorage;

class ProfileController extends Controller
{
    public function uploadProfilePicture(Request $request)
    {
        CloudStorage::bucket();
        if (!$request->hasFile('picture')) {
            return response()->json(ResponseObject::validationError([
                'picture' => ["Please upload the valid file"]
            ]), StatusCode::$VALIDATION_ERROR);
        }
        $file = $request->file('picture');
        // error_log($file->getClientOriginalName());
    }
}
