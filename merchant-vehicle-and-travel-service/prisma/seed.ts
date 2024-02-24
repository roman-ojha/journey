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
    no_of_seats: 35,
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
      "GA",
      "GH",
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
      {
        name: "Birtamod",
      },
      {
        name: "Bhadrapur",
      },
      {
        name: "Padajugi",
      },
    ],
  },
  {
    name: "Morong",
    places: <Place[]>[
      {
        name: "Urlabari",
      },
      {
        name: "Pathri",
      },
    ],
  },
  {
    name: "Sunsari",
    places: <Place[]>[
      {
        name: "Itahari",
      },
      {
        name: "Biratnagar",
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
      {
        name: "Kalanki",
      },
      {
        name: "Jadibuti",
      },
      {
        name: "Sorhakhutte",
      },
    ],
  },
  {
    name: "Kaski",
    places: <Place[]>[
      {
        name: "Pokhara",
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
  "https://images.unsplash.com/photo-1573812456956-4a85dfc2ed00?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1583508805133-8fd03a9916d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1617479625255-43666e3a3509?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1600198741448-fc40d918673a?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1534359265607-b9cdb5e0a81e?q=80&w=1946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1614140510679-96ae6ebd078e?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1612616044334-d35d54f899a0?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1617727553220-ab21c48259c6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1571391105999-0f21a2154d6c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1535109395380-c7807234e24b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1618805154647-7d89ac05926b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1577459640575-219cbf231b8b?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1509749837427-ac94a2553d0e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1670491584909-fad9d3a4f66d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1632276536839-84cad7fd03b0?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1564694202883-46e7448c1b26?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1597920467799-ec8bee99f6eb?q=80&w=2140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1661589586735-c5f07b7da1fe?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1594825223369-381029794758?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1559762740-77e772d4d6d8?q=80&w=1942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1607512060958-423166921a75?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

  for (let i = 0; i < vehicleImages.length; i++) {
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
    // const vehicleImage =
    //   vehicleImages[Math.floor(Math.random() * vehicleImages.length)];
    const vehicleImage = vehicleImages[i];

    const vehicleMerchantName = faker.person.firstName() + " Yatayat Pvt.Ltd";
    const vehicleName = faker.person.firstName() + " Delux";
    const vehicleTempName = vehicleName + ", AC (" + vehicleMerchantName + ")";
    const vehicleSlug =
      slugify(vehicleName, { lower: true }) + "-" + generateRandomHash(25);

    const is_booked = Math.random() > 0.5;
    let seat_booked_at: Date | null = null;
    let user_id: number | null = null;
    if (is_booked) {
      seat_booked_at = new Date();
      user_id = 1;
    }

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
                // random true or false
                is_booked: is_booked,
                booked_at: seat_booked_at,
                user_id,
              };
            }),
          },
          travels: {
            create: [
              {
                from_: fromPlace.id,
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
