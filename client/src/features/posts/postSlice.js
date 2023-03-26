import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
  post: [],
  post: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {},
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
