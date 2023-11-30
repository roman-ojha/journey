import Database from "./index";

class Repository extends Database {
  public async getVehicleModels() {
    return await this.vehicleModel().findMany();
  }

  public async createNewVehicle(
    merchant_id: number,
    plate_no: string,
    model_id: string,
    images: string[]
  ) {
    return await this.vehicle().create({
      data: {
        merchant_id,
        plate_no,
        model_id,
        Images: {
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
        Images: {
          select: {
            id: true,
            image: true,
          },
        },
      },
    });
  }

  public async getListOfVehicles(merchant_id: number) {
    return await this.vehicle().findMany({
      where: {
        merchant_id,
      },
      select: {
        id: true,
        merchant_id: true,
        plate_no: true,
        model_id: true,
        Images: {
          select: {
            id: true,
            image: true,
          },
        },
      },
    });
  }

  public async getVehicle(merchant_id: number, vehicle_id: string) {
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
        Images: {
          select: {
            id: true,
            image: true,
          },
        },
      },
    });
  }
}

export default Repository;
