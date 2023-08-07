import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "./firebase";

export interface LevelData {
  id?: string;
  stt: string;
  name: string;
  nameService: string;
  dateStart: string;
  dateEnd: string;
  activeStatus: string;
  powerSupply: string;
}
interface LevelState {
  levels: LevelData[];
  loading: boolean;
  error: string | null;
}
const initialState: LevelState = {
  levels: [],
  loading: false,
  error: null,
};
export const fetchLevel = createAsyncThunk("levels/fetchLevel", async () => {
  try {
    const dataRef = await db.collection("levels").get();
    const data: LevelData[] = [];
    dataRef.forEach((doc) => {
      const level = doc.data() as LevelData;
      level.id = doc.id;
      data.push(level);
    });
    return data;
  } catch (err) {
    throw err;
  }
});
const levelSlice = createSlice({
  name: "levels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchLevel.fulfilled,
        (state, action: PayloadAction<LevelData[]>) => {
          state.loading = false;
          state.levels = action.payload;
        }
      )
      .addCase(fetchLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLevel.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default levelSlice.reducer;
