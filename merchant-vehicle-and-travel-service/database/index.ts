import { prisma } from "../config/database";

class Database {
  protected vehicleModel;
  protected vehicleImage;
  protected vehicle;
  protected vehicleSeat;
  protected place;
  protected travel;
  constructor() {
    this.vehicleModel = () => prisma.vehicleModel;
    this.vehicleImage = () => prisma.vehicleImage;
    this.vehicle = () => prisma.vehicle;
    this.vehicleSeat = () => prisma.vehicleSeat;
    this.place = () => prisma.place;
    this.travel = () => prisma.travel;
  }
}

export default Database;
