import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function connect() {
  await prisma
    .$connect()
    .then(() => {
      console.log("Database connected");
    })
    .catch((err: any) => {
      console.log(err);
    });
}

async function disconnect() {
  await prisma
    .$disconnect()
    .then(() => {})
    .catch((err: any) => {
      console.log(err);
    });
}

const User = prisma.user;

export { connect, disconnect, User, prisma };
