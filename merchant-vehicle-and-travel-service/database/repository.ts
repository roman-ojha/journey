import { STATUS_CODES } from "../data/constants";
import { APIError } from "../utils/app-error";
import Database from "./index";

class Repository extends Database {
  public async getPlaceById(place_id: string) {
    try {
      return await this.place().findFirst({
        where: {
          id: place_id,
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

  public async getDistrictWithPlaces() {
    try {
      return await this.district().findMany({
        select: {
          id: true,
          name: true,
          places: {
            select: {
              id: true,
              name: true,
            },
          },
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

  public async getVehicleModels(model_id: string | null = null) {
    try {
      if (!model_id) {
        return await this.vehicleModel().findMany();
      }
      return await this.vehicleModel().findFirst({
        where: {
          id: model_id,
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

  public async createNewVehicle(
    merchant_id: number,
    plate_no: string,
    model_id: string,
    images: string[]
  ) {
    try {
      return await this.vehicle().create({
        data: {
          merchant_id,
          plate_no,
          model_id,
          images: {
            createMany: {
              data: images.map((image) => {
                return {
                  image,
                };
              }),
            },
          },
        },
        // include: {
        //   Images: true,
        // },
        select: {
          id: true,
          merchant_id: true,
          plate_no: true,
          model_id: true,
          images: {
            select: {
              id: true,
              image: true,
            },
          },
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

  public async getListOfVehicles(merchant_id: number) {
    try {
      return await this.vehicle().findMany({
        where: {
          merchant_id,
        },
        select: {
          id: true,
          merchant_id: true,
          plate_no: true,
          model_id: true,
          images: {
            select: {
              id: true,
              image: true,
            },
          },
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

  public async getVehicle(merchant_id: number, vehicle_id: string) {
    try {
      return await this.vehicle().findFirst({
        where: {
          merchant_id,
          id: vehicle_id,
        },
        select: {
          id: true,
          merchant_id: true,
          plate_no: true,
          model_id: true,
          images: {
            select: {
              id: true,
              image: true,
            },
          },
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

  public async createNewTravel(
    departure_at: string,
    route: string,
    driver_no: number,
    from: string,
    to: string,
    vehicle_id: string
  ) {
    try {
      const newTravel = await this.travel().create({
        data: {
          departure_at,
          route,
          driver_no,
          from,
          to,
          vehicle_id,
        },
        select: {
          departure_at: true,
          route: true,
          driver_no: true,
          from: true,
          to: true,
          vehicle: true,
        },
      });

      return {
        ...newTravel,
        driver_no: Number(newTravel.driver_no),
      };
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
