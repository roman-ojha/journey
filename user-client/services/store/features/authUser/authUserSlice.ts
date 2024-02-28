import { SafeUser } from "@/schema/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserTypeWithoutId = Omit<SafeUser, "id">;
type FinalUserType = UserTypeWithoutId & { id: number | null };

const initialState: FinalUserType = {
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
