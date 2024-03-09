import { PrismaClient as MerchantVehicleAndTravelPrismaClient } from "../prisma/client/merchant-v-and-t-service";
import { PrismaClient as UserReviewPrismaClient, Review } from "@prisma/client";
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
  type NewReview = {
    rating: Review["rating"];
    review: Review["review"];
    user_id: number;
    vehicle_id: string;
  };

  let reviewData: NewReview[] = [];
  for (let vehicle_id = 0; vehicle_id < vehiclesId.length; vehicle_id++) {
    for (let user_id = 0; user_id < userId.length; user_id++) {
      reviewData.push({
        rating: faker.number.int({ min: 2, max: 5 }),
        review: faker.lorem.sentence({ min: 25, max: 60 }),
        user_id: userId[user_id],
        vehicle_id: vehiclesId[vehicle_id],
      });
    }
  }
  await userReviewPrisma.review.createMany({
    data: reviewData,
  });
}

seedVehicleReviews();
