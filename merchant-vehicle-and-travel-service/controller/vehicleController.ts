import { Request, Response, NextFunction } from "express";
import Controller from ".";

export default class VehicleController extends Controller {
  constructor() {
    super();
    this.addVehicle = this.addVehicle.bind(this);
  }

  async addVehicle(req: Request, res: Response, next: NextFunction) {
    console.log(req.files);
    return res.json({ user: req.user });
  }
}
