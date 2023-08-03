// src/store/store.js
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./authSlice";
import cloudDataReducer from "./cloudataSlice";
import deviceSlice from "./deviceSlice";
import userSlice from "./userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cloudData: cloudDataReducer,
  device: deviceSlice,
  users:userSlice
});

const middleware = [...getDefaultMiddleware(), thunkMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
