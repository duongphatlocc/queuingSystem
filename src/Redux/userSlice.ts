import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "./firebase";

export interface UserData {
  id?: string;
  userName: string;
  fullName: string;
  phone: string;
  email: string;
  role: string;
  activeStatus: string;
}
interface UserState {
  users: UserData[];
  loading: boolean;
  error: string | null;
}
const initialState: UserState = {
  users: [],
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

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
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
      });
  },
});

export default userSlice.reducer;
