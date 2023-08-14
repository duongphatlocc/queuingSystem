// src/store/store.js
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./authSlice";
import cloudDataReducer from "./cloudataSlice";
import deviceSlice from "./deviceSlice";
import userSlice from "./userSlice";
import levelSlice from "./levelSlice";
import serviceSlice from "./servicelice";
import serviceSlice2 from "./test";
import roleSlice from "./roleSlice";
import diarySlice from "./diarySlice";


const rootReducer = combineReducers({
  auth: authReducer,
  cloudData: cloudDataReducer,
  devices: deviceSlice,
  users: userSlice,
  levels: levelSlice,
  services: serviceSlice,
  services2: serviceSlice2,
  roles: roleSlice,
  diaries: diarySlice,
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
