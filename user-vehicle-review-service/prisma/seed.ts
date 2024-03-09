import { PrismaClient as MerchantVehicleAndTravelPrismaClient } from "../prisma/client/merchant-v-and-t-service";
import { PrismaClient as UserReviewPrismaClient } from "@prisma/client";
import { PrismaClient as UserPrismaClient } from "../prisma/client/user-service";
import { faker } from "@faker-js/faker";

async function seedVehicleReviews() {
  // const userPrisma = new UserPrismaClient();
  const merchantVAndTPrisma = new MerchantVehicleAndTravelPrismaClient();
  const userReviewPrisma = new UserReviewPrismaClient();
  const userPrisma = new UserPrismaClient();
  const vehicles = await merchantVAndTPrisma.vehicles.findMany();
  const vehiclesId = vehicles.map((vehicles) => vehicles.id);
  const users = await userPrisma.user.findMany({
    select: {
      id: true,
    },
  });
  const userId = users.map((user) => user.id);
  await userReviewPrisma.review.createMany({
    data: Array.from({ length: 120000 }, () => ({
      rating: faker.number.int({ min: 2, max: 5 }),
      review: faker.lorem.sentence({ min: 25, max: 100 }),
      user_id: userId[Math.floor(Math.random() * userId.length)],
      vehicle_id: vehiclesId[Math.floor(Math.random() * vehiclesId.length)],
    })),
  });
}

seedVehicleReviews();
