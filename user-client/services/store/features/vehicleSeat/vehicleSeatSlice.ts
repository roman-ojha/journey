import { VehicleDetail } from "@/hooks/reactQuery/useVehicleDetail";
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
    setVehicleDetailSeats: (
      state,
      action: PayloadAction<VehicleDetail["seats"]>
    ) => {
      // console.log(action.payload);
      // console.log(state);
      // console.log(action.payload);
      state.map((row, rowIndex) => {
        row.map((seat, columnIndex) => {
          const info = state[rowIndex][columnIndex];
          action.payload.map((payloadSeat: any) => {
            if (payloadSeat.seat.name == info.seatNumber && info.isSeat) {
              // console.log(payloadSeat.seat.name, info.isSeat);
              // console.log(payloadSeat.is_booked);
              info.isBooked = payloadSeat.is_booked;
            }
          });
        });
      });
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
export const { handleSelect, setVehicleDetailSeats } =
  vehicleSeatsSlice.actions;
export const { getSelectedSeats } = vehicleSeatsSlice.selectors;
