import { Request, Response, NextFunction } from "express";
import Controller from ".";

export default class TravelController extends Controller {
  constructor() {
    super();
    this.createNewTravel = this.createNewTravel.bind(this);
  }

  public async createNewTravel(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
    } catch (err) {
      return next(err);
    }
  }
}
