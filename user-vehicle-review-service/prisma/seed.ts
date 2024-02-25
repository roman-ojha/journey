import { PrismaClient as MerchantVehicleAndTravelPrismaClient } from "../prisma/client/merchant-v-and-t-service";
import { PrismaClient as UserReviewPrismaClient } from "@prisma/client";
import { PrismaClient as UserPrismaClient } from "../prisma/client/user-service";
import { faker } from "@faker-js/faker";

async function seedVehicleReviews() {
  const userPrisma = new UserPrismaClient();
  const merchantVAndTPrisma = new MerchantVehicleAndTravelPrismaClient();
  const userReviewPrisma = new UserReviewPrismaClient();
  const users = await userPrisma.user.findFirst({
    where: {
      email: "roman@gmail.com",
    },
  });
  if (users) {
    // Get all the vehicles
    const vehicles = await merchantVAndTPrisma.vehicles.findMany();
    const vehiclesId = vehicles.map((vehicles) => vehicles.id);
    await userReviewPrisma.review.createMany({
      data: Array.from({ length: 1000 }, () => ({
        rating: faker.number.int({ min: 1, max: 5 }),
        review: faker.lorem.sentence({ min: 25, max: 100 }),
        user_id: users.id,
        vehicle_id: vehiclesId[Math.floor(Math.random() * vehiclesId.length)],
      })),
    });
  }
}

seedVehicleReviews();
