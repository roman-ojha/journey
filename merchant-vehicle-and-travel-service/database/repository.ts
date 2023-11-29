import Database from "./index";

class Repository extends Database {
  public async getVehicleModels() {
    return await this.vehicleModel().findMany();
  }
}

export default Repository;
