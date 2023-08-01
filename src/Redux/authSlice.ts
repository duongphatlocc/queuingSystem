// src/store/authSlice.js
import { Dispatch, createSlice } from "@reduxjs/toolkit";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2jkHEBTIzA9y_FrMg4g0SSjEdabgAufc",
  authDomain: "queuing-system-12980.firebaseapp.com",
  projectId: "queuing-system-12980",
  storageBucket: "queuing-system-12980.appspot.com",
  messagingSenderId: "15571153450",
  appId: "1:15571153450:web:dec9a843e9154d00c24953",
  measurementId: "G-JE8YCX2L3S",
};

firebase.initializeApp(firebaseConfig);

interface AuthState {
  user: null | any;
  loading: boolean;
  error: null | string;
  username: string;
  password: string;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  username: "",
  password: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, setLoading, setError, setUsername, setPassword } =
  authSlice.actions;

export const login =
  (username: string, password: string) => async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(username, password);
      const user = userCredential.user;
      dispatch(setUser(user));
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

export default authSlice.reducer;
