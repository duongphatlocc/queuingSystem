// diarySlice.js
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "./firebase";

export interface DiaryData {
  id?: string;
  username: string;
  ipAddress: string;
  timestamp: string;
}
interface DiaryState {
  diaris: DiaryData[];
  loading: boolean;
  error: string | null;
}
const initialState: DiaryState = {
  diaris: [],
  loading: false,
  error: null,
};
export const fetchDiary = createAsyncThunk("diaris/fetchDiary", async () => {
  try {
    const dataRef = await db.collection("diaris").get();
    const data: DiaryData[] = [];
    dataRef.forEach((doc) => {
      const diary = doc.data() as DiaryData;
      diary.id = doc.id;
      data.push(diary);
    });
    return data;
  } catch (err) {
    throw err;
  }
});
const diarySlice = createSlice({
  name: "diaries",
  initialState,

  reducers: {
    updateDiaryEntry(state: any, action) {
      state.push(action.payload); // Add the new diary entry to the state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchDiary.fulfilled,
        (state, action: PayloadAction<DiaryData[]>) => {
          state.loading = false;
          state.diaris = action.payload;
        }
      )
      .addCase(fetchDiary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiary.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateDiaryEntry } = diarySlice.actions;
export default diarySlice.reducer;
