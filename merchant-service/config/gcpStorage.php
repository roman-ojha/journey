<?php

namespace Config\GCPCloudStorage;

use Google\Cloud\Storage\StorageClient;

class CloudStorage
{


    public static function bucket()
    {
        $storage = new StorageClient([
            'keyFile' => json_decode(file_get_contents(base_path() . '/../gcp-cloud-storage-access-service-account-key.json'), true)
        ]);
        // foreach ($storage->buckets() as $bucket) {
        //     error_log('Bucket: %s' . PHP_EOL . $bucket->name());
        // }
        return $storage->bucket(env("GCP_CLOUD_STORAGE_PUBLIC_BUCKET_NAME", ""));
    }
}
