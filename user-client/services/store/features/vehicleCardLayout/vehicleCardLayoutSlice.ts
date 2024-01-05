import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type VehicleCardLayoutState = {
  layout: "grid" | "list";
};

function getInitialLayout(): VehicleCardLayoutState["layout"] {
  const layout =
    typeof window !== "undefined"
      ? window.localStorage.getItem("vehicleCardLayout")
      : "grid";
  if (layout === "grid" || layout === "list") {
    return layout;
  }
  return "grid";
}

const initialState: VehicleCardLayoutState = {
  layout: getInitialLayout(),
};

const vehicleCardLayoutSlice = createSlice({
  name: "vehicleCardLayout",
  initialState,
  reducers: {
    setVehicleCardLayout: (
      state: VehicleCardLayoutState,
      action: PayloadAction<VehicleCardLayoutState["layout"]>
    ) => {
      window.localStorage.setItem("vehicleCardLayout", action.payload);
      state.layout = action.payload;
    },
  },
});

export default vehicleCardLayoutSlice.reducer;
export const { setVehicleCardLayout } = vehicleCardLayoutSlice.actions;
