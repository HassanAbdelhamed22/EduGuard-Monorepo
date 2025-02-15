import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profileSlice.js";
import notificationsReducer from "./slices/notificationsSlice.js";
import { thunk } from "redux-thunk";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
