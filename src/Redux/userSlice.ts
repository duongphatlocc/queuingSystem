import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "./firebase";

export interface UserData {

  id?: string;
  userName?: string;
  fullName?: string;
  phone?: string;
  email?: string;
  role?: string;
  activeStatus?: string;
  password?: string;
  rePassword?: string;
}
export interface LoginData {
  userName: string;
  password: string;
}

interface UserState {

  users: UserData[];
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  currentUser: UserData | null;
}

const initialState: UserState = {
  users: [],
  isAuthenticated: false,
  currentUser: null,
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk("users/fetchUser", async () => {
  try {
    const dataRef = await db.collection("users").get();
    const data: UserData[] = [];
    dataRef.forEach((doc) => {
      const user = doc.data() as UserData;
      user.id = doc.id;
      data.push(user);
    });
    return data;
  } catch (err) {
    throw err;
  }
});

export const addUser = createAsyncThunk(
  "users/addUser",
  async (user: UserData) => {
    try {
      const docRef = await db.collection("users").add(user);
      user.id = docRef.id;
      return user;
    } catch (err) {
      throw err;
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (user: UserData) => {
    try {
      await db.collection("users").doc(user.id).update(user);
      return user;
    } catch (err) {
      throw err;
    }
  }
);


const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserData>) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<UserData[]>) => {
          state.loading = false;
          state.users = action.payload;
        }
      )
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        const index = state.users.findIndex(
          (user) => user.id === updatedUser.id
        );
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })
      .addCase(updateUser.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
  },
});
export const { logoutSuccess, loginSuccess } = userSlice.actions;
export const saveUserDataToFirestore =
  (user: UserData) => async (dispatch: any) => {
    try {
      await db.collection("users").doc(user.id).set(user);
    } catch (error) {
      console.error("Lỗi khi lưu thông tin người dùng vào Firestore:", error);
    }
  };
export default userSlice.reducer;
