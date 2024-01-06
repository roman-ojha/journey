import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type EmptySeat = {
  isSeat: false;
  type?: never;
  isBooked?: never;
  isSelected?: never;
  seatNumber?: never;
  seatPrice?: never;
};

export type DriverSeat = {
  isSeat: true;
  type: "driver";
  isBooked?: never;
  isSelected?: never;
  seatNumber?: never;
  seatPrice?: never;
};

export type BookedUserSeat = {
  isSeat: true;
  type: "user";
  isBooked: true;
  isSelected?: never;
  seatNumber: string;
  seatPrice: number;
};

export type SelectedUserSeat = {
  isSeat: true;
  type: "user";
  isBooked?: never;
  isSelected: true;
  seatNumber: string;
  seatPrice: number;
};

export type NormalUserSeat = {
  isSeat: true;
  type: "user";
  isBooked: false;
  isSelected?: never;
  seatNumber: string;
  seatPrice: number;
};

export type VehicleSeat =
  | EmptySeat
  | DriverSeat
  | BookedUserSeat
  | SelectedUserSeat
  | NormalUserSeat;

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
    getSelectedUserSeat("A9", 1350),
    getSelectedUserSeat("A9", 1350),
    getEmptySeat(),
    getBookedUserSeat("KH", 1350),
    getBookedUserSeat("KH", 1350),
  ],
  [
    getSelectedUserSeat("A9", 1350),
    getSelectedUserSeat("A9", 1350),
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
});

export default vehicleSeatsSlice.reducer;
export const { handleSelect } = vehicleSeatsSlice.actions;
