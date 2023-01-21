import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameInfo: {
    blackCards: 4,
    whiteCards: 4,
    turn: 123,
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
  turn: 0,
};

const gameSlice = createSlice({
  name: "gameSlice",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.gameInfo = action.payload;
    },
  },
});
export const { setUsers } = gameSlice.actions;
export default gameSlice.reducer;
