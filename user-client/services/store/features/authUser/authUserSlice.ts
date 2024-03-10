import { SafeUser } from "@/schema/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserTypeWithoutId = Omit<SafeUser, "id">;
export type AuthUser = UserTypeWithoutId & { id: number | null };

export const initialState: AuthUser = {
  email: "",
  f_name: "",
  gender: "FEMALE",
  id: null,
  l_name: "",
  number: 0,
  picture: "",
};

const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<AuthUser>) => {
      return action.payload;
    },
  },
  selectors: {
    authUser: (state) => state,
    isAuthenticated: (state) => state.id !== null,
  },
});

export default authUserSlice.reducer;
export const authUserSelector = authUserSlice.selectors;
export const { setAuthUser } = authUserSlice.actions;
