import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  indicated: null,
  initBtn: false,
  initReady: false,
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
    setInitReadyBtn: (state, action) => {
      state.initReady = action.payload;
    },
    setTrigger: (state, action) => {
      state.trigger = action.payload;
    },
    setEndingInfo: (state, action) => {
      state.ending = !state.ending;
      state.endingInfo = action.payload;
    },
    setInit: (state, action) => {
      state.trigger = false;
      state.indicated = null;
      state.initBtn = false;
      state.initReady = false;
      state.trigger = false;
      state.gameInfo = {
        blackCards: 13,
        whiteCards: 13,
        turn: null,
        users: [],
      };
      state.ending = false;
      state.endingInfo = [];
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
  setInitReadyBtn,
} = gameSlice.actions;
export default gameSlice.reducer;
