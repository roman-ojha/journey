import { STATUS_CODES } from "../data/constants";
import { APIError } from "../utils/app-error";
import Database from "./index";
import slugify from "slugify";

class Repository extends Database {
  public async reviewVehicle(
    vehicle_id: string,
    rating: number,
    review: string,
    user_id: number
  ) {
    try {
      const updateResponse = await this.userReviewClient.review.updateMany({
        where: {
          user_id,
          vehicle_id,
        },
        data: {
          rating,
          review,
        },
      });
      if (updateResponse.count === 0) {
        // Then insert a new review done by auth user
        return await this.userReviewClient.review.create({
          data: {
            vehicle_id,
            user_id,
            rating,
            review,
          },
        });
      }
      return await this.userReviewClient.review.findFirst({
        where: {
          user_id,
          vehicle_id,
        },
      });
    } catch (err) {
      throw new APIError(
        "API_ERROR",
        STATUS_CODES.INTERNAL_ERROR,
        (err as Error).message,
        "Something when wrong while trying to interact with database"
      );
    }
  }

  public async getVehicleReviewDoneByAuthUser(
    user_id: number,
    vehicle_id: string
  ) {
    try {
      return await this.userReviewClient.review.findFirst({
        where: {
          user_id,
          vehicle_id,
        },
      });
    } catch (err) {
      throw new APIError(
        "API_ERROR",
        STATUS_CODES.INTERNAL_ERROR,
        (err as Error).message,
        "Something when wrong while trying to interact with database"
      );
    }
  }

  public async getVehicleById(vehicle_id: string) {
    try {
      return await this.merchantVAndTClient.vehicles.findFirst({
        where: {
          id: vehicle_id,
        },
      });
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
