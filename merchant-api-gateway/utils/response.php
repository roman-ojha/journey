<?php

namespace Utils\Response;

class ResponseObject
{
    public static function validationError($errors, string $message = "The given data was invalid")
    {
        return [
            'message' => $message,
            'errors' => $errors
        ];
    }

    public static function successResponse(string $message = "Response Successfully", $data = null)
    {
        if ($data == null) {
            return ['message' => $message];
        }
        return ['message' => $message, 'data' => $data];
    }

    public static function failResponse(string $message = "Internal Server Error")
    {
        return ['message' => $message];
    }
}
