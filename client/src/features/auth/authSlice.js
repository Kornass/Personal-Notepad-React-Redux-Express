// Create Async Thunk allows us to make an action (for example taking data from client's form and put it into backend)
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

//Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

// initial state
const initialState = {
  user: user ? user : null,
  // from server
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// A function that handle asynnchronous requests.
//  Within createSlice, synchronous requests made to the store are handled in the reducers object while extraReducers handles asynchronous requests, which is our main focus.
// Asynchronous requests created with createAsyncThunk accept three parameters: an action type string, a callback function (referred to as a payloadCreator), and an options object.

// reference : https://blog.logrocket.com/using-redux-toolkits-createasyncthunk/

// Thunk being called with data that we passed in while dispatching (in react component). CreateAsyncThunk generates a proimise lifecycle action using link prefixes:
// pending : auth/register/pending
// fullfilled: auth/register/fullfilled
// rejected: auth/register/rejected
// On its initial call, createAsyncThunk dispatches the posts/getPosts/pending lifecycle action type

// The three lifecycle action types mentioned can then be evaluated in extraReducers in our Slice
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
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

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  console.log(user);
});
// createSilce - A function that accepts an initial state, an object of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.
// A slice is the portion of Redux code that relates to a specific set of data and actions within the store 's state. A slice reducer is the reducer responsible for handling actions and updating the data for a given slice.
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // reseting our state to default
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  // we can bing our promises lifecycles actions to extraReducers here
  extraReducers: (builder) => {
    // .addCase Adds a case reducer to handle a single exact action type.
    builder
      .addCase(register.pending, (state) => {
        // When registeroing promise is pending we set our isLoading state to true
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // payload is a user data from successfully fullfilled promise
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        // setting user to null cause smth needed to go wrong
        state.user = null;
        state.isError = true;
        // payload from thunkAPI.rejectWithValue(message)
        state.message = action.payload;
      });
  },
});
// exporting from reducers
export const { reset } = authSlice.actions;
export default authSlice.reducer;
