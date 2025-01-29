import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profileSlice.js";
import { thunk } from "redux-thunk";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
