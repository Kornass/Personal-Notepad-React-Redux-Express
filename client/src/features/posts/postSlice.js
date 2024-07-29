import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
  posts: [],
  post: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createPost = createAsyncThunk(
  "posts/create",
  async (postData, thunkAPI) => {
    try {
      // thunk API allows us to access whatever is in the state
      const token = thunkAPI.getState().auth.user.token;
      return await postService.createPost(postData, token);
    } catch (error) {
      // getting message from our backend
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // We use thunkAPI rejectWithValue method to handle an error
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserPosts = createAsyncThunk(
  "posts/getAll",
  async (_, thunkAPI) => {
    try {
      // thunk API allows us to access whatever is in the state
      const token = thunkAPI.getState().auth.user.token;
      return await postService.getPosts(token);
    } catch (error) {
      // getting message from our backend
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // We use thunkAPI rejectWithValue method to handle an error
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSinglePost = createAsyncThunk(
  "posts/get",
  async (ticketId, thunkAPI) => {
    try {
      // thunk API allows us to access whatever is in the state
      const token = thunkAPI.getState().auth.user.token;
      return await postService.getPost(ticketId, token);
    } catch (error) {
      // getting message from our backend
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // We use thunkAPI rejectWithValue method to handle an error
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const closePost = createAsyncThunk(
  "posts/close",
  async (ticketId, thunkAPI) => {
    try {
      // thunk API allows us to access whatever is in the state
      const token = thunkAPI.getState().auth.user.token;
      return await postService.closePost(ticketId, token);
    } catch (error) {
      // getting message from our backend
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // We use thunkAPI rejectWithValue method to handle an error
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePostStatus = createAsyncThunk(
  "posts/updateStatus",
  async (ticketId, thunkAPI) => {
    try {
      // thunk API allows us to access whatever is in the state
      const token = thunkAPI.getState().auth.user.token;
      return await postService.updatePostStatus(ticketId, token);
    } catch (error) {
      // getting message from our backend
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // We use thunkAPI rejectWithValue method to handle an error
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePostContent = createAsyncThunk(
  "posts/updateContent",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.updatePostContent(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removePost = createAsyncThunk(
  "posts/remove",
  async (ticketId, thunkAPI) => {
    try {
      // thunk API allows us to access whatever is in the state
      const token = thunkAPI.getState().auth.user.token;
      return await postService.deletePost(ticketId, token);
    } catch (error) {
      // getting message from our backend
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // We use thunkAPI rejectWithValue method to handle an error
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const restorePost = createAsyncThunk(
  "posts/restore",
  async (ticketId, thunkAPI) => {
    try {
      // thunk API allows us to access whatever is in the state
      const token = thunkAPI.getState().auth.user.token;
      return await postService.restorePost(ticketId, token);
    } catch (error) {
      // getting message from our backend
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // We use thunkAPI rejectWithValue method to handle an error
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createPost.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      // payload from thunk API rejectedWithValue method
      state.message = action.payload;
    });
    builder.addCase(getUserPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.posts = action.payload;
    });
    builder.addCase(getUserPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      // payload from thunk API rejectedWithValue method
      state.message = action.payload;
    });
    builder.addCase(getSinglePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSinglePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.post = action.payload;
    });
    builder.addCase(getSinglePost.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      // payload from thunk API rejectedWithValue method
      state.message = action.payload;
    });
    builder.addCase(closePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts.map((post) =>
        post._id === action.payload._id ? (post.status = "closed") : post
      );
    });
    builder.addCase(updatePostStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts.map((post) =>
        post._id === action.payload?._id ? (post.status = "open") : post
      );
    });
    builder.addCase(updatePostContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts.map((post) =>
        post._id === action.payload?._id
          ? (post.post = action.payload.post)
          : post
      );
    });
    builder.addCase(removePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.post = action.payload;
    });
    builder.addCase(removePost.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      // payload from thunk API rejectedWithValue method
      state.message = action.payload;
    });
    builder.addCase(restorePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(restorePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.post = action.payload;
    });
    builder.addCase(restorePost.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      // payload from thunk API rejectedWithValue method
      state.message = action.payload;
    });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
