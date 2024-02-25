import {
  merchantVAndTClient,
  userClient,
  userReviewClient,
} from "../config/database";

class Database {
  merchantVAndTClient = merchantVAndTClient;
  userClient = userClient;
  userReviewClient = userReviewClient;
  constructor() {
    // this.review = () => prisma.review;
  }
}

export default Database;
