import { prisma } from "../config/database";

class Database {
  protected vehicleModel;
  protected vehicleImage;
  protected vehicle;
  protected vehicleSeat;
  protected district;
  protected place;
  protected travel;
  constructor() {
    this.vehicleModel = () => prisma.vehicleModel;
    this.vehicleImage = () => prisma.vehicleImage;
    this.vehicleSeat = () => prisma.vehicleSeat;
    this.vehicle = () => prisma.vehicle;
    this.district = () => prisma.district;
    this.place = () => prisma.place;
    this.travel = () => prisma.travel;
  }
}

export default Database;
