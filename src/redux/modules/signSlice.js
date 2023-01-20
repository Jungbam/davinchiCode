import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userInfo: { nickName: "익명" },
};

const signSlice = createSlice({
  name: "signSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
    },
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});
export const { login, logout, setUser } = signSlice.actions;
export default signSlice.reducer;
