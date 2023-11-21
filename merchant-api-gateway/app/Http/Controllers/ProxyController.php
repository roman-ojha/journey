<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client as HttpClient;
use Illuminate\Http\Request;

class ProxyController extends Controller
{
    //
    public function forward(Request $request, $path)
    {
        $url = "http://127.0.0.1:8006";
        $client = new HttpClient([
            'base_uri' => $url,
        ]);
        try {
            $response = $client->request($request->method(), $url . '/' . $path, [
                'headers' => $request->header(),
                'query'   => $request->query(),
                'json'    => $request->json()->all(),
                'form_params' => $request->post(),
                'files'   => $request->files->all(),
                // 'cookies' => $request->cookies->all(),
            ]);
            return response($response->getBody(), $response->getStatusCode())
                ->withHeaders($response->getHeaders());
            // error_log($url . '/' . $path);
            // error_log($request->method());
            // $client = new HttpClient();
            // return $client->request($request->method(), $url . '/' . $path);
        } catch (\Exception $e) {
            return response($e->getMessage(), 500);
        }
    }
}
