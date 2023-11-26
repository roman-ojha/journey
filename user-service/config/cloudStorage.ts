import { Storage } from "@google-cloud/storage";
import path from "path";

const gcpStorage = new Storage({
  // https://github.com/googleapis/nodejs-storage
  keyFilename: path.resolve(
    __dirname,
    "../../gcp-cloud-storage-access-service-account-key.json"
  ),
});

const gcpStoragePublicBucket = gcpStorage.bucket(
  process.env.GCP_CLOUD_STORAGE_PUBLIC_BUCKET_NAME as string
);

export { gcpStorage, gcpStoragePublicBucket };
