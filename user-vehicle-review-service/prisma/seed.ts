import { PrismaClient as MerchantVehicleAndTravelPrismaClient } from "@prisma/client/merchant-v-and-t-service";
import { PrismaClient as UserReviewPrismaClient } from "@prisma/client/user-review-service";
import { PrismaClient as UserPrismaClient } from "@prisma/client/user-service";
import { faker } from "@faker-js/faker";
import generateRandomHash from "../utils/generateRandomHash";

async function seedVehicleReviews() {
  const prisma = new UserPrismaClient();
}
