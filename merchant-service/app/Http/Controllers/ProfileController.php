<?php

namespace App\Http\Controllers;

use App\Models\Merchant;
use Illuminate\Http\Request;

require_once base_path('data/constants.php');
require_once base_path('utils/response.php');
require_once base_path('config/gcpStorage.php');

use Data\Constants\StatusCode;
use Utils\Response\ResponseObject;
use Config\GCPCloudStorage\CloudStorage;
use Exception;

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
        // $file->store('upload',); // upload locally
        $uploadResponse = CloudStorage::bucket()->upload($file->get(), ['name' => 'merchant/' . $file->hashName()]);
        $isUpdated = Merchant::where('email', '=', $request->user['email'])->update(['picture' => $uploadResponse->name()]);
        if ($isUpdated) {
            $merchant = Merchant::where('email', '=', $request->user['email'])->first();
            return response()->json(ResponseObject::successResponse('Successfully Updated profile picture', $merchant), StatusCode::$OK);
        }
        return response()->json(ResponseObject::failResponse(), StatusCode::$INTERNAL_SERVER_ERROR);
    }
}
