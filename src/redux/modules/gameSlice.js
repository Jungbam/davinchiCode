import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  indicated: null,
  initBtn: false,
  initReady: false,
  trigger: false,
  gameStart: false,
  roomInfo: {
    maxMembers: 4,
    members: 1,
    isPlaying: false,
    secret: false,
    roomId: 0,
    roomName: "",
  },
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
    setRoom: (state, action) => {
      state.roomInfo = action.payload;
    },
    setIndicater: (state, action) => {
      state.indicated = action.payload;
    },
    setInitBtn: (state, action) => {
      state.initBtn = action.payload;
    },
    setInitReadyBtn: (state, action) => {
      state.initReady = action.payload;
    },
    setTrigger: (state, action) => {
      state.trigger = action.payload;
    },
    setGameStart: (state, action) => {
      state.gameStart = action.payload;
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
      state.gameStart = false;
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
  setGameStart,
  setRoom,
} = gameSlice.actions;
export default gameSlice.reducer;
