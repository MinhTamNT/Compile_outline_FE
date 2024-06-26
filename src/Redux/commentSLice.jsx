import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {
    commentSpecificationStart: (state) => {
      state.loading = true;
    },
    commentSpecificationSuccess: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    },
    commentSpecificationFail: (state) => {
      state.error = true;
    },
  },
});

export const {
  commentSpecificationFail,
  commentSpecificationStart,
  commentSpecificationSuccess,
} = commentSlice.actions;

export default commentSlice.reducer;
