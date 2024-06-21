import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API, authApi, endpoints } from "../Service/ApiConfig";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
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
  },
});

export const {
  getCurrentUserFail,
  getCurrentUserStart,
  getCurrentUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
