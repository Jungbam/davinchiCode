import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSLice",
  initialState: { isLoggedIn: false },
  reducers: {},
});

export default authSlice.reducer;
