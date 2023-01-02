import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SignAPI } from "../../api/axios";

export const kakaoAuth = createAsyncThunk(
  "authSlice/kakaoAuth",
  async (key, thunkAPI) => {
    const response = await SignAPI.kakaoSign(key);
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState: { isLoggedIn: false },
  reducers: {},
  extraReducers: {
    [kakaoAuth.fulfiled]: (state, { payload }) => {},
  },
});

export default authSlice.reducer;
