import { PrismaClient as MerchantVehicleAndTravelPrismaClient } from "@prisma/client/merchant-v-and-t-service";
import { PrismaClient as UserReviewPrismaClient } from "@prisma/client";
import { PrismaClient as UserPrismaClient } from "@prisma/client/user-service";

// Creating 3 database clients
const merchantVAndTClient = new MerchantVehicleAndTravelPrismaClient();
const userReviewClient = new UserReviewPrismaClient();
const userClient = new UserPrismaClient();

async function connect() {
  await userReviewClient
    .$connect()
    .then(() => {
      console.log("Connected to User Review service database");
    })
    .catch((err: any) => {
      console.log(err);
    });
  await merchantVAndTClient
    .$connect()
    .then(() => {
      console.log("Connected to merchant-v-and-t-service database");
    })
    .catch((err: any) => {
      console.log(err);
    });
  await userClient
    .$connect()
    .then(() => {
      console.log("Connected to user service database");
    })
    .catch((err: any) => {
      console.log(err);
    });
}

async function disconnect() {
  await userReviewClient
    .$disconnect()
    .then(() => {})
    .catch((err: any) => {
      console.log(err);
    });
  await merchantVAndTClient
    .$disconnect()
    .then(() => {})
    .catch((err: any) => {
      console.log(err);
    });
  await userClient
    .$disconnect()
    .then(() => {})
    .catch((err: any) => {
      console.log(err);
    });
}

export {
  connect,
  disconnect,
  userReviewClient,
  merchantVAndTClient,
  userClient,
};
