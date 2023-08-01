// src/store/cloudDataSlice.js
import { createSlice } from "@reduxjs/toolkit";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const cloudDataSlice = createSlice({
  name: "cloudData",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setData, setLoading, setError } = cloudDataSlice.actions;

export const fetchData = () => async (dispatch:any) => {
  dispatch(setLoading(true));
  try {
    // Replace "collectionName" with the actual name of your collection in Firestore
    const snapshot = await firebase.firestore().collection("users").get();
    const data = snapshot.docs.map((doc) => doc.data());
    dispatch(setData(data));
  } catch (error:any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default cloudDataSlice.reducer;
