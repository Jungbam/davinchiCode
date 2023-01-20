import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "../modules/gameSlice";
import signSlice from "../modules/signSlice";

const store = configureStore({ reducer: { signSlice, gameSlice } });

export default store;
