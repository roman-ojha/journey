import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type VehicleCardLayoutState = {
  layout: "grid" | "list";
};

const initialState: VehicleCardLayoutState = {
  layout: "grid",
};

const vehicleCardLayoutSlice = createSlice({
  name: "vehicleCardLayout",
  initialState,
  reducers: {
    setVehicleCardLayout: (
      state: VehicleCardLayoutState,
      action: PayloadAction<VehicleCardLayoutState["layout"]>
    ) => {
      state.layout = action.payload;
    },
  },
});

export default vehicleCardLayoutSlice.reducer;
export const { setVehicleCardLayout } = vehicleCardLayoutSlice.actions;
