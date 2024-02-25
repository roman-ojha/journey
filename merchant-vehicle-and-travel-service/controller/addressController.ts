import { Request, Response, NextFunction } from "express";
import Controller from ".";
import { successResponse } from "../utils/responseObject";
import amqplib from "amqplib";

export default class AddressController extends Controller {
  public constructor(channel: amqplib.Channel) {
    super(channel);
    this.getAddress = this.getAddress.bind(this);
  }

  public async getAddress(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json(
        successResponse(null, await this.repository.getDistrictWithPlaces())
      );
    } catch (err) {
      return next(err);
    }
  }
}
