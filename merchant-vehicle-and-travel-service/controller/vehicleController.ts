import { Request, Response, NextFunction } from "express";
import Controller from ".";

export default class VehicleController extends Controller {
  constructor() {
    super();
    this.addVehicle = this.addVehicle.bind(this);
    this.getVehicleModels = this.getVehicleModels.bind(this);
  }

  public async getVehicleModels(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      return res.json(await this.repository.getVehicleModels());
    } catch (err) {
      return next(err);
    }
  }

  public async addVehicle(req: Request, res: Response, next: NextFunction) {
    console.log(req.files);
    return res.json({ user: req.user });
  }
}
