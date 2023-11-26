import { IUser } from "../../models/User";
import { prisma } from "../config/prisma";

class Database {
  public user;
  constructor() {
    this.user = () => prisma.user;
  }
}

export default Database;
