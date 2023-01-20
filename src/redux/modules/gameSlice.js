import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [{}],
};

const gameSlice = createSlice({
  name: "gameSlice",
  initialState,
  reducers: {},
});
export const {} = gameSlice.actions;
export default gameSlice.reducer;
