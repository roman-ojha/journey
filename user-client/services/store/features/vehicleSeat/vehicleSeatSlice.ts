import {
  BookedUserSeat,
  DriverSeat,
  EmptySeat,
  NormalUserSeat,
  SelectedUserSeat,
  VehicleSeat,
} from "@/interface/Vehicle";
import {
  PayloadAction,
  createSlice,
  createDraftSafeSelector,
} from "@reduxjs/toolkit";

const getEmptySeat = (): EmptySeat => ({
  isSeat: false,
});

const getDriverSeat = (): DriverSeat => ({
  isSeat: true,
  type: "driver",
});

const getBookedUserSeat = (
  seatNumber: string,
  seatPrice: number
): BookedUserSeat => ({
  isSeat: true,
  type: "user",
  isBooked: true,
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

const initialState: VehicleSeat[][] = [
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
    getBookedUserSeat("KH", 1350),
  ],
  [
    getBookedUserSeat("KH", 1350),
    getNormalUserSeat("KA", 1350),
    getEmptySeat(),
    getBookedUserSeat("KH", 1350),
    getNormalUserSeat("KA", 1350),
  ],
  [
    getBookedUserSeat("KH", 1350),
    getNormalUserSeat("KA", 1350),
    getEmptySeat(),
    getBookedUserSeat("KH", 1350),
    getBookedUserSeat("KH", 1350),
  ],
  [
    getBookedUserSeat("KH", 1350),
    getNormalUserSeat("KA", 1350),
    getEmptySeat(),
    getNormalUserSeat("KA", 1350),
    getNormalUserSeat("KA", 1350),
  ],
  [
    getNormalUserSeat("KA", 1350),
    getNormalUserSeat("KA", 1350),
    getEmptySeat(),
    getBookedUserSeat("KH", 1350),
    getNormalUserSeat("KA", 1350),
  ],
  [
    getNormalUserSeat("KA", 1350),
    getNormalUserSeat("KA", 1350),
    getEmptySeat(),
    getBookedUserSeat("KH", 1350),
    getNormalUserSeat("KA", 1350),
  ],
  [
    getNormalUserSeat("KA", 1350),
    getBookedUserSeat("KH", 1350),
    getEmptySeat(),
    getNormalUserSeat("KA", 1350),
    getBookedUserSeat("KH", 1350),
  ],
  [
    // getSelectedUserSeat("A9", 1350),
    // getSelectedUserSeat("A9", 1350),
    getNormalUserSeat("KA", 1350),
    getNormalUserSeat("KA", 1350),
    getEmptySeat(),
    getBookedUserSeat("KH", 1350),
    getBookedUserSeat("KH", 1350),
  ],
  [
    // getSelectedUserSeat("A9", 1350),
    // getSelectedUserSeat("A9", 1350),
    getNormalUserSeat("KA", 1350),
    getNormalUserSeat("KA", 1350),
    getEmptySeat(),
    getNormalUserSeat("KA", 1350),
    getNormalUserSeat("KA", 1350),
  ],
  [
    getNormalUserSeat("KA", 1350),
    getNormalUserSeat("KA", 1350),
    getNormalUserSeat("KA", 1350),
    getNormalUserSeat("KA", 1350),
    getNormalUserSeat("KA", 1350),
  ],
];

const vehicleSeatsSlice = createSlice({
  name: "vehicleSeats",
  initialState,
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
export const { handleSelect } = vehicleSeatsSlice.actions;
export const { getSelectedSeats } = vehicleSeatsSlice.selectors;
