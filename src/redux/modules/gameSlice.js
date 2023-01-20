import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [{}],
};

const gameSlice = createSlice({
  name: "gameSlice",
  initialState,
  reducers: {
    setMine: (state, action) => {
      state.users[0] = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});
export const { setMine, setUsers } = gameSlice.actions;
export default gameSlice.reducer;
