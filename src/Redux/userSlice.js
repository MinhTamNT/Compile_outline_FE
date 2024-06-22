import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      currentUser: null,
      pending: false,
      error: false,
    },
    updateUser: {
      currentUser: null,
      pending: false,
      error: false,
    },
  },
  reducers: {
    getCurrentUserStart: (state) => {
      state.user.pending = true;
    },
    getCurrentUserSuccess: (state, action) => {
      state.user.pending = false;
      state.user.currentUser = action.payload;
    },
    getCurrentUserFail: (state) => {
      state.user.error = true;
    },
    updateUserStart: (state) => {
      state.user.pending = true;
    },
    updateUserSuccess: (state, action) => {
      state.user.pending = false;
      state.user.currentUser = action.payload;
    },
    updateUserFail: (state) => {
      state.user.error = true;
    },
  },
});

export const {
  getCurrentUserFail,
  getCurrentUserStart,
  getCurrentUserSuccess,
  updateUserFail,
  updateUserStart,
  updateUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
