import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "./firebase";

export interface RoleData {
  id?: string;
  name: string;
  description: string;
}
interface RoleState {
  roles: RoleData[];
  loading: boolean;
  error: string | null;
}
const initialState: RoleState = {
  roles: [],
  loading: false,
  error: null,
};
export const addRole = createAsyncThunk(
  "roles/addRole",
  async (role: RoleData) => {
    try {
      const docRef = await db.collection("roles").add(role);
      role.id = docRef.id;
      return role;
    } catch (err) {
      throw err;
    }
  }
);
export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async (role: RoleData) => {
    try {
      await db.collection("roles").doc(role.id).update(role);
      return role;
    } catch (err) {
      throw err;
    }
  }
);
export const fetchRole = createAsyncThunk("roles/fetchRole", async () => {
  try {
    const dataRef = await db.collection("roles").get();
    const data: RoleData[] = [];
    dataRef.forEach((doc) => {
      const role = doc.data() as RoleData;
      role.id = doc.id;
      data.push(role);
    });
    return data;
  } catch (err) {
    throw err;
  }
});


const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(
      fetchRole.fulfilled,
      (state, action: PayloadAction<RoleData[]>) => {
        state.loading = false;
        state.roles = action.payload;
      }
    )
    .addCase(fetchRole.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchRole.rejected, (state: any, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
      .addCase(addRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles.push(action.payload);
      })
      .addCase(addRole.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false;
        const updateRole = action.payload;
        const index = state.roles.findIndex(
          (role) => role.id === updateRole.id
        );
        if (index !== -1) {
          state.roles[index] = updateRole;
        }
      })
      .addCase(updateRole.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default roleSlice.reducer;
