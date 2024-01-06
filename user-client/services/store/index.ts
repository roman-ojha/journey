import { configureStore } from "@reduxjs/toolkit";
import vehicleCardLayout from "./features/vehicleCardLayout/vehicleCardLayoutSlice";
import vehicleSeats from "./features/vehicleSeat/vehicleSeatSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      vehicleCardLayout,
      vehicleSeats,
    },
    devTools: true,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
