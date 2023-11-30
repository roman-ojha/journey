import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { VehicleModels } from "../model/VehicleModel";
import { District } from "../model";
import { Place } from "../model";

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

async function createAddress() {
  const prisma = new PrismaClient();
  address.map(async (address) => {
    try {
      async function createPlaces(newDistrictId: string) {
        address.places?.map(async (place) => {
          if (
            !(await prisma.place.findFirst({
              where: {
                district_id: newDistrictId,
                name: place.name,
              },
            }))
          ) {
            // Places have still not created
            // So create new place
            const newPlace = await prisma.place.create({
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

createAddress();
