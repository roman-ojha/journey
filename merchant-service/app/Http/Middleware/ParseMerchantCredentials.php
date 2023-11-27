<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ParseMerchantCredentials
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $privateKeyPath = base_path() . '\\project_private_key.pem';
        // if (!file_exists($privateKeyPath)) {
        //     error_log("Private key path not found");
        // }
        // $privateKey = openssl_pkey_get_private(file_get_contents($privateKeyPath));
        $privateKey = openssl_pkey_get_private(env('PROJECT_PRIVATE_KEY'));
        $encryptedUserBuffer = base64_decode($request->header('x-user'));
        $decryptedUser = '';
        $decryptionResult = openssl_private_decrypt($encryptedUserBuffer, $decryptedUser, $privateKey, OPENSSL_PKCS1_OAEP_PADDING);
        if ($decryptionResult) {
            $user = json_decode($decryptedUser, true);
            if ($user['email'] && $user['id']) {
                $request->merge(['user' => $user]);
            }
        }
        // else{
        //     // $opensslError = openssl_error_string(); // Get the OpenSSL error
        //     // error_log('Error decrypting user data. OpenSSL error: ' . $opensslError);
        // }
        return $next($request);
    }
}
