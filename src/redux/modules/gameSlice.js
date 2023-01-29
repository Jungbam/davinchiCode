import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  indicated: null,
  initBtn: false,
  trigger: false,
  gameInfo: {
    blackCards: 4,
    whiteCards: 4,
    turn: null,
    users: [],
  },
  ending: false,
  endingInfo: [],
};

const gameSlice = createSlice({
  name: "gameSlice",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.gameInfo = action.payload;
    },
    setIndicater: (state, action) => {
      state.indicated = action.payload;
    },
    setInitBtn: (state, action) => {
      state.initBtn = !state.initBtn;
    },
    setTrigger: (state, action) => {
      state.trigger = !state.trigger;
    },
    setEndingInfo: (state, action) => {
      state.ending = !state.ending;
    },
    setInit: (state, action) => {
      state = initialState;
    },
  },
});
export const {
  setUsers,
  setIndicater,
  setInitBtn,
  setTrigger,
  setInit,
  setEndingInfo,
} = gameSlice.actions;
export default gameSlice.reducer;
