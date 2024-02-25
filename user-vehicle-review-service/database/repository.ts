import { STATUS_CODES } from "../data/constants";
import { APIError } from "../utils/app-error";
import Database from "./index";
import slugify from "slugify";

class Repository extends Database {
  public async reviewVehicle() {
    try {
    } catch (err) {
      throw new APIError(
        "API_ERROR",
        STATUS_CODES.INTERNAL_ERROR,
        (err as Error).message,
        "Something when wrong while trying to interact with database"
      );
    }
  }
}

export default Repository;
