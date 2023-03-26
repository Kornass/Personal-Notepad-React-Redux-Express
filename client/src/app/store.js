import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import postReducer from "../features/posts/postSlice";

// Unlike createStore, configureStore from Redux Toolkit not only creates a store but can also accept reducer functions as arguments and automatically sets up the Redux DevTools Extension for easy debugging.
// The store is a “container” (really a JavaScript object) that holds the application state, and the only way the state can change is through actions dispatched to the store. Redux allows individual components connect to the store and apply changes to it by dispatching actions.
export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
});
