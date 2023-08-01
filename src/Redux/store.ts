// src/store/store.js
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./authSlice";
import cloudDataReducer from "./cloudataSlice";
import deviceSlice from "./deviceSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cloudData: cloudDataReducer,
});

const middleware = [...getDefaultMiddleware(), thunkMiddleware];

const store = configureStore({
  reducer: {
    device: deviceSlice,
  },
  middleware,
});

export default store;
