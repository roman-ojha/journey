import { SafeUser } from "@/schema/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: SafeUser = {
  email: "",
  f_name: "",
  gender: "FEMALE",
  id: 0,
  l_name: "",
  number: 0,
  picture: "",
};

const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<SafeUser>) => {
      return action.payload;
    },
  },
  selectors: {
    authUser: (state) => state,
  },
});

export default authUserSlice.reducer;
export const { setAuthUser } = authUserSlice.actions;
