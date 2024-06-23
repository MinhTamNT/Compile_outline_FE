import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    getUser: {
      pending: false,
      error: false,
    },
    updateUser: {
      pending: false,
      error: false,
    },
  },
  reducers: {
    getCurrentUserStart: (state) => {
      state.getUser.pending = true;
    },
    getCurrentUserSuccess: (state, action) => {
      state.getUser.pending = false;
      state.currentUser = action.payload;
    },
    getCurrentUserFail: (state) => {
      state.getUser.pending = false;
      state.getUser.error = true;
    },
    updateUserStart: (state) => {
      state.updateUser.pending = true;
      state.updateUser.error = false; // Reset error state
    },
    updateUserSuccess: (state, action) => {
      state.updateUser.pending = false;
      state.currentUser = action.payload; // Update currentUser as well
    },
    updateUserFail: (state) => {
      state.updateUser.pending = false;
      state.updateUser.error = true;
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
