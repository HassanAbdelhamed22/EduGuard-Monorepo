import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profileSlice.js";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});

export default store;
