import { prisma } from "../config/database";

class Database {
  public vehicle;
  public vehicleImage;
  public seat;
  public place;
  public travel;
  constructor() {
    this.vehicle = () => prisma.vehicle;
    this.vehicleImage = () => prisma.vehicleImage;
    this.seat = () => prisma.seat;
    this.place = () => prisma.place;
    this.travel = () => prisma.travel;
  }
}

export default Database;
