import { prisma } from "../config/prisma";
import { PrismaClient } from "@prisma/client";

class Database {
  public user;

  constructor() {
    this.user = () => prisma.user;
  }
}

export default Database;
