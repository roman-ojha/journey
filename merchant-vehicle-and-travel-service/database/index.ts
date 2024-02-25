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
    this.vehicleImage = () => prisma.vehicleImages;
    this.vehicleSeat = () => prisma.vehicleSeats;
    this.vehicle = () => prisma.vehicles;
    this.district = () => prisma.district;
    this.place = () => prisma.places;
    this.travel = () => prisma.travels;
  }
}

export default Database;
