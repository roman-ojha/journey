import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { VehicleModels } from "../model/VehicleModel";
import { District } from "../model";
import { Place } from "../model";
import generateRandomHash from "../utils/generateRandomHash";
import slugify from "slugify";

const vehicleModels: VehicleModels[] = [
  {
    name: "SUPER_DELUX_BUS",
    no_of_seats: 31,
    seats: [
      "KA",
      "KH",
      "A",
      "B",
      "A1",
      "A2",
      "A3",
      "A4",
      "A5",
      "A6",
      "A7",
      "A8",
      "A9",
      "A10",
      "A11",
      "A12",
      "A13",
      "A14",
      "A15",
      "B1",
      "B2",
      "B3",
      "B4",
      "B5",
      "B6",
      "B7",
      "B8",
      "B9",
      "B10",
      "B11",
      "B12",
      "B13",
      "B14",
    ],
  },
  {
    name: "HIASE",
    no_of_seats: 15,
    seats: [
      "A",
      "B",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
    ],
  },
];

async function createVehicleModelAndAddSeats() {
  const prisma = new PrismaClient();
  vehicleModels.map(async (model_info) => {
    try {
      if (
        !(await prisma.vehicleModel.findFirst({
          where: {
            name: model_info.name,
          },
        }))
      ) {
        // Create if doesn't exist
        await prisma.vehicleModel.create({
          data: {
            name: model_info.name,
            no_of_seats: model_info.no_of_seats,
            seats: {
              create: model_info.seats.map((seat_name) => {
                return {
                  name: seat_name,
                };
              }),
            },
          },
        });
      } else console.log(`${model_info.name} already exist`);
    } catch (err) {
      console.log(err);
    }
  });
}

const address: Partial<District>[] = [
  {
    name: "Jhapa",
    places: <Place[]>[
      {
        name: "Kerkha",
      },
      {
        name: "Kakarvhita",
      },
      {
        name: "Damak",
      },
      {
        name: "Dudee",
      },
    ],
  },
  {
    name: "Kathmandu",
    places: <Place[]>[
      {
        name: "Koteshowr",
      },
      {
        name: "Gongabu, New Bus Park",
      },
    ],
  },
];

const vehicleImages = [
  "https://images.unsplash.com/photo-1557223562-6c77ef16210f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1607424064879-708250e57647?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1661963208071-9a65b048ebaf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1677440603651-b8e3f2c73e00?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1650807486050-a142ea418b19?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1694497905206-a23fa36b4536?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

async function createVehiclesAndTravel() {
  const prisma = new PrismaClient();
  const vehicleModelsRes = await prisma.vehicleModel.findMany({
    select: {
      id: true,
      name: true,
      no_of_seats: true,
      seats: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  for (let i = 0; i < 10; i++) {
    const vehicleModel =
      vehicleModelsRes[Math.floor(Math.random() * vehicleModelsRes.length)];
    // const vehicleSeats = vehicleModels.filter(
    //   (model) => model.name === vehicleModel.name
    // )[0].seats;
    const vehicleSeats = vehicleModel.seats;
    const placesRes = await prisma.places.findMany();
    const fromPlaceIndex = Math.floor(Math.random() * placesRes.length);
    const fromPlace = placesRes[fromPlaceIndex];
    const toPlace = placesRes[(fromPlaceIndex + 1) % placesRes.length];
    const vehicleImage =
      vehicleImages[Math.floor(Math.random() * vehicleImages.length)];

    const vehicleMerchantName = faker.person.firstName() + " Yatayat Pvt.Ltd";
    const vehicleName = faker.person.firstName() + " Delux";
    const vehicleTempName = vehicleName + ", AC (" + vehicleMerchantName + ")";
    const vehicleSlug =
      slugify(vehicleName, { lower: true }) + "-" + generateRandomHash(25);

    prisma.vehicles
      .create({
        data: {
          merchant_id: 1,
          plate_no: "BA 1 KHA " + faker.number.int(),
          name: vehicleTempName,
          slug: vehicleSlug,
          images: {
            create: [
              {
                image: vehicleImage,
              },
            ],
          },
          model_id: vehicleModel.id,
          // seats: {
          //   create: vehicleSeats.map((seat) => {
          //     return {
          //       name: seat,
          //     };
          //   }),
          // },
          seats: {
            create: vehicleSeats.map((seat) => {
              return {
                price: 1600,
                seat_id: seat.id,
              };
            }),
          },
          travels: {
            create: [
              {
                from: fromPlace.id,
                to: toPlace.id,
                driver_no: faker.number.bigInt(),
                route: "",
                departure_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
                is_active: true,
                seat_average_price:
                  Math.floor(Math.random() * (2000 - 1100 + 1)) + 1100, // Random price between 1100 and 2000
              },
            ],
          },
        },
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }
}

async function createAddress() {
  const prisma = new PrismaClient();
  address.map(async (address) => {
    try {
      async function createPlaces(newDistrictId: string) {
        address.places?.map(async (place) => {
          if (
            !(await prisma.places.findFirst({
              where: {
                district_id: newDistrictId,
                name: place.name,
              },
            }))
          ) {
            // Places have still not created
            // So create new place
            const newPlace = await prisma.places.create({
              data: {
                name: place.name as string,
                district_id: newDistrictId,
              },
            });
          }
        });
      }
      const district = await prisma.district.findFirst({
        where: {
          name: address.name,
        },
      });

      if (!district) {
        //  District doesn't exist
        const newDistrict = await prisma.district.create({
          data: {
            name: address.name as string,
          },
        });
        if (newDistrict) {
          // District created
          // Now create places
          createPlaces(newDistrict.id);
        }
      } else {
        // District has been created now try to create places
        console.log(`${district.name} Already exist, Creating Places`);
        createPlaces(district.id);
      }
    } catch (err) {
      console.log(err);
    }
  });
}

// createVehicleModelAndAddSeats();
// createAddress();

createVehiclesAndTravel();
