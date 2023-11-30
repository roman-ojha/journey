// type VehicleModels =
//   | "SUPER_DELUX_BUS" // 31
//   | "HIASE"; // 15;

type VehicleModels =
  | {
      name: "SUPER_DELUX_BUS";
      no_of_seats: 31;
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
        "B14"
      ];
    }
  | {
      name: "HIASE";
      no_of_seats: 15;
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
        "13"
      ];
    };

// interface IVehicleModels {
//   name: VehicleModels;
//   seats: number;
// }

interface VehicleModel {
  id: string;
  name: string;
  no_of_seats: number;
  created_at: Date;
  updated_at: Date;
  //   Vehicles    Vehicle[]
  //   seats       VehicleSeat[]
}

export { VehicleModels, VehicleModel };
