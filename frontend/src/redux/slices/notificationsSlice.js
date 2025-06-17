import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    unreadCount: 0, // Initial unread count
  },
  reducers: {
    setUnreadCount: (state, action) => {
      state.unreadCount = action.payload;
    },
    incrementUnreadCount: (state) => {
      state.unreadCount += 1;
    },
    decrementUnreadCount: (state) => {
      state.unreadCount -= 1;
    },
  },
});

export const { setUnreadCount, incrementUnreadCount, decrementUnreadCount } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;