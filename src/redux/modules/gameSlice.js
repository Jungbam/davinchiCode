import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  indicated: null,
  initBtn: false,
  trigger: false,
  gameInfo: {
    blackCards: 4,
    whiteCards: 4,
    turn: null,
    users: [
      {
        userId: 1,
        nickName: "익명1",
        isReady: true,
        userProfileImg:
          "https://cdn.pixabay.com/photo/2023/01/12/15/05/flamingo-7714344_640.jpg",
        hand: [],
      },
      {
        userId: 2,
        nickName: "익명2",
        isReady: true,
        userProfileImg:
          "https://cdn.pixabay.com/photo/2022/07/11/08/44/tower-7314495_1280.jpg",
        hand: [],
      },
      {
        userId: 3,
        nickName: "익명3",
        isReady: true,
        userProfileImg:
          "https://cdn.pixabay.com/photo/2023/01/12/07/19/rat-7713508_640.jpg",
        hand: [],
      },
    ],
  },
  ending: false,
  endingInfo: [
    {
      userId: 1,
      nickName: "익명1",
      score: 12000,
      ranking: 123,
    },
    {
      userId: 2,
      nickName: "익명1",
      score: 12000,
      ranking: 123,
    },
    {
      userId: 3,
      nickName: "익명1",
      score: 12000,
      ranking: 123,
    },
  ],
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
    setEnding: (state, action) => {
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
  setEnding,
} = gameSlice.actions;
export default gameSlice.reducer;
