import { Storage } from "@google-cloud/storage";
import path from "path";

const gcpStorage = new Storage({
  keyFilename: path.resolve(
    __dirname,
    "../../gcp-cloud-storage-access-service-account-key.json"
  ),
});

export { gcpStorage };
