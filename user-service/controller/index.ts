import { User } from "../config/prisma";
import Database from "../database/index";

class Controller {
  public db: Database;
  constructor() {
    this.db = new Database();
  }
}

export default Controller;
