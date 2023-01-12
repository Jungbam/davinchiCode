import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SignAPI } from "../../api/axios";

export const __kakaoAuth = createAsyncThunk(
  "authSlice/kakaoAuth",
  async (code, thunkAPI) => {
    try {
      const res = await SignAPI.kakaoSign(code);
      const status = res.status;
      return thunkAPI.fulfillWithValue(status);
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);
export const __myInfo = createAsyncThunk(
  "authSlice/__myInfo",
  async (payload, thunkAPI) => {
    try {
      const res = await SignAPI.myinfo();
      thunkAPI.fulfillWithValue({ ...res });
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);
export const __updateInfo = createAsyncThunk(
  "authSlice/__updateInfo",
  async (formData, thunkAPI) => {
    try {
      await SignAPI.updateinfo(formData);
      return thunkAPI.dispatch(__myInfo());
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  myInfo: {},
  isLoggedIn: false,
  status: 0,
};
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [__kakaoAuth.fulfilled]: (state, { payload }) => {
      state.status = payload;
    },
    [__myInfo.fulfilled]: (state, { payload }) => {},
  },
});

export default authSlice.reducer;
