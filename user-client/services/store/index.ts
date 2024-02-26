import { configureStore } from "@reduxjs/toolkit";
import vehicleCardLayout from "./features/vehicleCardLayout/vehicleCardLayoutSlice";
import vehicleSeats from "./features/vehicleSeat/vehicleSeatSlice";
import authUser from "./features/authUser/authUserSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      vehicleCardLayout,
      vehicleSeats,
      authUser,
    },
    devTools: true,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
