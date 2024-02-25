import generateRandomHash from "../utils/generateRandomHash";
import { STATUS_CODES } from "../data/constants";
import { APIError } from "../utils/app-error";
import Database from "./index";
import slugify from "slugify";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

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
        select: {
          id: true,
          name: true,
          no_of_seats: true,
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

  public async getVehicleModelWithSeats(model_id: string) {
    try {
      return await this.vehicleModel().findFirst({
        where: {
          id: model_id,
        },
        select: {
          id: true,
          name: true,
          no_of_seats: true,
          seats: {
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

  public async createNewVehicle(
    merchant_id: number,
    plate_no: string,
    model_id: string,
    images: string[],
    name: string
  ) {
    const slug = slugify(name, { lower: true }) + "-" + generateRandomHash(25);
    try {
      const vehicleModel = await this.getVehicleModelWithSeats(model_id);
      return await this.vehicle().create({
        data: {
          merchant_id,
          plate_no,
          model_id,
          name,
          slug,
          images: {
            createMany: {
              data: images.map((image) => {
                return {
                  image,
                };
              }),
            },
          },
          seats: {
            create: vehicleModel?.seats.map((seat) => {
              return {
                price: 1600,
                seat_id: seat.id,
                is_booked: false,
              };
            }),
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
          from_: from,
          to,
          vehicle_id,
          is_active: true,
          seat_average_price:
            Math.floor(Math.random() * (2000 - 1100 + 1)) + 1100, // NOTE: For now we generate random price between 1100 and 2000
        },
        select: {
          departure_at: true,
          route: true,
          driver_no: true,
          from_: true,
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
