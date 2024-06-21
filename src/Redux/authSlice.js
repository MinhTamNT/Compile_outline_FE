import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API, endpoints } from "../Service/ApiConfig";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    loading: false,
    error: null,
  },
  reducers: {
    loginUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginUserSuccess: (state, action) => {
      state.loading = false;
      state.accessToken = action.payload;
    },
    loginUserFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { loginUserStart, loginUserSuccess, loginUserFail } =
  authSlice.actions;

export default authSlice.reducer;
