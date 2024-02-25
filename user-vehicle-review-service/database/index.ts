import { prisma } from "../config/database";

class Database {
  protected review;
  constructor() {
    this.review = () => prisma.review;
  }
}

export default Database;
