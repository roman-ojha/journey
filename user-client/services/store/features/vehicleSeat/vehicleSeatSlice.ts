import { VehicleDetail } from "@/hooks/reactQuery/useVehicleDetail";
import {
  BookedUserSeat,
  DriverSeat,
  EmptySeat,
  NormalUserSeat,
  SelectedUserSeat,
  VehicleSeat,
} from "@/interface/Vehicle";
import { VehicleModel } from "@/schema/VehicleModel";
import {
  PayloadAction,
  createSlice,
  createDraftSafeSelector,
} from "@reduxjs/toolkit";
import { setAuthUser } from "../authUser/authUserSlice";
import { Irish_Grover } from "next/font/google";
import { SafeUser } from "@/schema/User";

const getEmptySeat = (): EmptySeat => ({
  isSeat: false,
});

const getDriverSeat = (): DriverSeat => ({
  isSeat: true,
  type: "driver",
});

const getBookedUserSeat = (
  seatNumber: string,
  seatPrice: number,
  isBookedByAuthUser: boolean
): BookedUserSeat => ({
  isSeat: true,
  type: "user",
  isBooked: true,
  isBookedByAuthUser: isBookedByAuthUser,
  seatNumber,
  seatPrice,
});

const getSelectedUserSeat = (
  seatNumber: string,
  seatPrice: number
): SelectedUserSeat => ({
  isSeat: true,
  type: "user",
  isSelected: true,
  seatNumber,
  seatPrice,
});

const getNormalUserSeat = (
  seatNumber: string,
  seatPrice: number
): NormalUserSeat => ({
  isSeat: true,
  type: "user",
  isBooked: false,
  seatNumber,
  seatPrice,
});

const initialSuperDeluxeSeats: VehicleSeat[][] = [
  [
    getEmptySeat(),
    getEmptySeat(),
    getEmptySeat(),
    getEmptySeat(),
    getDriverSeat(),
  ],
  [
    getEmptySeat(),
    getEmptySeat(),
    getEmptySeat(),
    getNormalUserSeat("KA", 1350),
    getNormalUserSeat("KH", 1350),
  ],
  [
    getNormalUserSeat("A", 1350),
    getNormalUserSeat("B", 1350),
    getEmptySeat(),
    getNormalUserSeat("GA", 1350),
    getNormalUserSeat("GH", 1350),
  ],
  [
    getNormalUserSeat("A1", 1350),
    getNormalUserSeat("A2", 1350),
    getEmptySeat(),
    getNormalUserSeat("B1", 1350),
    getNormalUserSeat("B2", 1350),
  ],
  [
    getNormalUserSeat("A3", 1350),
    getNormalUserSeat("A4", 1350),
    getEmptySeat(),
    getNormalUserSeat("B3", 1350),
    getNormalUserSeat("B4", 1350),
  ],
  [
    getNormalUserSeat("A5", 1350),
    getNormalUserSeat("A6", 1350),
    getEmptySeat(),
    getNormalUserSeat("B5", 1350),
    getNormalUserSeat("B6", 1350),
  ],
  [
    getNormalUserSeat("A7", 1350),
    getNormalUserSeat("A8", 1350),
    getEmptySeat(),
    getNormalUserSeat("B7", 1350),
    getNormalUserSeat("B8", 1350),
  ],
  [
    getNormalUserSeat("A9", 1350),
    getNormalUserSeat("A10", 1350),
    getEmptySeat(),
    getNormalUserSeat("B9", 1350),
    getNormalUserSeat("B10", 1350),
  ],
  [
    // getSelectedUserSeat("A9", 1350),
    // getSelectedUserSeat("A9", 1350),
    getNormalUserSeat("A11", 1350),
    getNormalUserSeat("A12", 1350),
    getEmptySeat(),
    getNormalUserSeat("B11", 1350),
    getNormalUserSeat("B12", 1350),
  ],
  [
    // getSelectedUserSeat("A9", 1350),
    // getSelectedUserSeat("A9", 1350),
    getNormalUserSeat("A13", 1350),
    getNormalUserSeat("A14", 1350),
    getNormalUserSeat("A15", 1350),
    getNormalUserSeat("B13", 1350),
    getNormalUserSeat("B14", 1350),
  ],
];

const initialHiaCeSeats: VehicleSeat[][] = [
  [
    getNormalUserSeat("A", 1350),
    getNormalUserSeat("B", 1350),
    getEmptySeat(),
    getDriverSeat(),
  ],
  [
    getEmptySeat(),
    getNormalUserSeat("1", 1350),
    getNormalUserSeat("2", 1350),
    getNormalUserSeat("3", 1350),
  ],
  [
    getNormalUserSeat("4", 1350),
    getEmptySeat(),
    getNormalUserSeat("5", 1350),
    getNormalUserSeat("6", 1350),
  ],
  [
    getNormalUserSeat("7", 1350),
    getEmptySeat(),
    getNormalUserSeat("8", 1350),
    getNormalUserSeat("9", 1350),
  ],
  [
    getNormalUserSeat("10", 1350),
    getNormalUserSeat("11", 1350),
    getNormalUserSeat("12", 1350),
    getNormalUserSeat("13", 1350),
  ],
];

const vehicleSeatsSlice = createSlice({
  name: "vehicleSeats",
  initialState: initialHiaCeSeats,
  reducers: {
    handleSelect: (
      state,
      action: PayloadAction<{ rowIndex: number; columnIndex: number }>
    ) => {
      const seat = state[action.payload.rowIndex][action.payload.columnIndex];
      if (!seat.isBooked && seat.isSeat && seat.type == "user") {
        if (!seat.isSelected)
          state[action.payload.rowIndex][action.payload.columnIndex] =
            getSelectedUserSeat(seat.seatNumber, seat.seatPrice);
        else
          state[action.payload.rowIndex][action.payload.columnIndex] =
            getNormalUserSeat(seat.seatNumber, seat.seatPrice);
      }
    },
    setVehicleDetailSeats: (
      state,
      action: PayloadAction<{
        seats: VehicleDetail["seats"];
        vehicleType: VehicleModel["name"];
        authUser: SafeUser;
      }>
    ) => {
      let finalTempSeats: VehicleSeat[][] = [];

      if (action.payload.vehicleType == "HIASE") {
        finalTempSeats = initialHiaCeSeats;
      } else if (action.payload.vehicleType == "SUPER_DELUX_BUS") {
        finalTempSeats = initialSuperDeluxeSeats;
      }
      const finalSeats = finalTempSeats.map((rowSeats, rowIndex) => {
        const finalColumnSeats = rowSeats.map((seat, columnIndex) => {
          const initialSeat = finalTempSeats[rowIndex][columnIndex];
          let tempSeat: VehicleSeat = getEmptySeat();
          action.payload.seats.map((payloadSeat: any) => {
            if (
              payloadSeat.seat.name == initialSeat.seatNumber &&
              initialSeat.isSeat
            ) {
              if (initialSeat.type === "user") {
                if (payloadSeat.is_booked) {
                  // console.log(payloadSeat);
                  if (payloadSeat.user_id == action.payload.authUser.id) {
                    tempSeat = getBookedUserSeat(
                      payloadSeat.seat.name,
                      payloadSeat.price,
                      true
                    );
                  } else {
                    tempSeat = getBookedUserSeat(
                      payloadSeat.seat.name,
                      payloadSeat.price,
                      false
                    );
                  }
                } else {
                  tempSeat = getNormalUserSeat(
                    payloadSeat.seat.name,
                    payloadSeat.price
                  );
                }
              }
            } else if (initialSeat.type === "driver") {
              tempSeat = getDriverSeat();
            }
          });
          return tempSeat;
        });
        return finalColumnSeats;
      });
      return finalSeats;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setAuthUser, (state, action) => {
      state.map((rowSeats, rowIndex) => {
        rowSeats.map((seat, columnIndex) => {
          // if(seat.isSeat && seat.type == "user"){
          //   if(seat.isBooked && action.payload?.id == seat.booked_user_id){
          //     state[rowIndex][columnIndex].isBookedByAuthUser = true;
          //   }
          // }
        });
      });
    });
  },
  selectors: {
    getSelectedSeats: (state) => {
      const result: VehicleSeat[] = [];
      state.map((row) => {
        const r = row.map((seat) => {
          if (seat.isSelected) {
            result.push(seat);
          }
        });
      });
      return result;
    },
    getBookedSeats: (state) => {
      const result: VehicleSeat[] = [];
      state.map((row) => {
        const r = row.map((seat) => {
          if (seat.isBooked) {
            result.push(seat);
          }
        });
      });
      return result;
    },
  },
});

export const getTotalSeatPrice = (selectedSeats: VehicleSeat[]) => {
  let total = 0;
  selectedSeats.map((seat) => {
    if (seat.isSeat && seat.type == "user") {
      total += seat.seatPrice;
    }
  });
  return total;
};

export default vehicleSeatsSlice.reducer;
export const { handleSelect, setVehicleDetailSeats } =
  vehicleSeatsSlice.actions;
export const { getSelectedSeats, getBookedSeats } = vehicleSeatsSlice.selectors;
