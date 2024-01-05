import { configureStore } from "@reduxjs/toolkit";
import vehicleCardLayoutReducer from "./features/vehicleCardLayout/vehicleCardLayoutSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      vehicleCardLayout: vehicleCardLayoutReducer,
    },
    devTools: true,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
