import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  indicated: null,
  initBtn: false,
  gameInfo: {
    blackCards: 4,
    whiteCards: 4,
    turn: null,
    users: [
      {
        userId: 1,
        nickName: "익명1",
        userProfileImg:
          "https://cdn.pixabay.com/photo/2023/01/12/15/05/flamingo-7714344_640.jpg",
        hand: [],
      },
      {
        userId: 2,
        nickName: "익명2",
        userProfileImg:
          "https://cdn.pixabay.com/photo/2022/07/11/08/44/tower-7314495_1280.jpg",
        hand: [],
      },
      {
        userId: 3,
        nickName: "익명3",
        userProfileImg:
          "https://cdn.pixabay.com/photo/2023/01/12/07/19/rat-7713508_640.jpg",
        hand: [],
      },
    ],
  },
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
  },
});
export const { setUsers, setIndicater, setInitBtn } = gameSlice.actions;
export default gameSlice.reducer;
