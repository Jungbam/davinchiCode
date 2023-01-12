import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SignAPI } from "../../api/axios";

export const __kakaoAuth = createAsyncThunk(
  "authSlice/kakaoAuth",
  async (code, thunkAPI) => {
    const res = await SignAPI.kakaoSign(code);
    if (res.status === 200) thunkAPI.fulfillWithValue(res.data);
  }
);
export const __myInfo = createAsyncThunk(
  "authSlice/__myInfo",
  async (payload, thunkAPI) => {
    const res = await SignAPI.myinfo();
    if (res.status === 200) thunkAPI.fulfillWithValue(res.data);
  }
);
const initialState = {
  myInfo: {},
  isLoggedIn: false,
};
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [__kakaoAuth.fulfilled]: (state, { payload }) => {},
    [__myInfo.fulfilled]: (state, { payload }) => {
      state.myInfo = payload;
    },
  },
});

export default authSlice.reducer;
