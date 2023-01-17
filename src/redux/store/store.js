import { configureStore } from "@reduxjs/toolkit";
import signSlice from "../modules/signSlice";

const store = configureStore({ reducer: signSlice });

export default store;
