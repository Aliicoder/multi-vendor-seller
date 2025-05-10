import { RootState } from "@/store/index";
import { IAuthState } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

let initialState: IAuthState = {
  userId: "",
  name: "",
  media: {
    url: "",
    publicId: "",
    type: "image",
  },
  roles: [],
  sellerStatus: "pending",
  accessToken: "",
  boarded: false,
  addresses: [],
};
export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (_, action) => {
      const user = action.payload;
      console.log("user action ", user);
      return user;
    },
    updateCredentails: (state, action) => {
      const user = { ...state, ...action.payload };
      return user;
    },
    clearCredentials: (_) => {
      return initialState;
    },
  },
});
export const { setCredentials, updateCredentails, clearCredentials } =
  authReducer.actions;
export default authReducer.reducer;
export const selectCurrentUser = (state: RootState) => state.auth;
