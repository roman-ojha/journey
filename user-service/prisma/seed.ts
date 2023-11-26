import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { generatePassword } from "../utils/userAuth";
import { IUser } from "../../models/User";

const createRandomUser = () => {
  const password = generatePassword(faker.internet.password({ length: 15 }));
  const gender: IUser["gender"][] = ["MALE", "FEMALE", "OTHER"];
  const avatar = [
    // These are the path of avatar exist in GCP cloud storage bucket
    "avatar/random-avatar-1.jpg",
    "avatar/random-avatar-2.jpg",
    "avatar/random-avatar-3.jpg",
    "avatar/random-avatar-4.jpg",
    "avatar/random-avatar-5.jpg",
  ];
  const is_verified = [true, false];
  return {
    email: faker.internet.email(),
    f_name: faker.internet.displayName(),
    l_name: faker.internet.displayName(),
    number: faker.number.bigInt({ max: 9849999990, min: 9800000000 }),
    password: password.hash,
    salt: password.salt,
    gender: gender[Math.floor(Math.random() * gender.length)],
    picture: avatar[Math.floor(Math.random() * avatar.length)],
    is_verified: is_verified[Math.floor(Math.random() * 2)],
  };
};

const seedUser = async (item: number) => {
  try {
    const prisma = new PrismaClient();
    for (let i = 0; i < item; i++) {
      const seededUser = await prisma.user.create({
        data: createRandomUser(),
      });
    }
    console.log("Seeded all user successfully");
  } catch (err) {
    console.log(err);
  }
};

seedUser(5);
