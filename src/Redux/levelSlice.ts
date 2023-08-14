import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "./firebase";
import "firebase/database";

export interface LevelData {
  id?: string;
  stt: string;
  email:string;
  phone:string;
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
export const createLevel = createAsyncThunk(
  "levels/createLevel",
  async (newLevel: LevelData) => {
    try {
      // Lấy danh sách các dòng trong collection "services"
      const dataRef = await db.collection("services").get();
      const codes: string[] = dataRef.docs.map((doc) => doc.data().code);

      // Tìm mã code đã có mà bạn đã chọn
      const selectedCode = newLevel.nameService; // Chọn theo tên dịch vụ hoặc cách bạn muốn

      // Tìm số lớn nhất hiện có cho mã code đã chọn
      const maxCode = Math.max(
        ...codes
          .filter((code) => code.startsWith(selectedCode))
          .map((code) => parseInt(code.slice(selectedCode.length), 10))
      );

      // Tạo mã số mới bằng cách cộng 1 vào số lớn nhất
      const newCode = `${selectedCode}${(maxCode + 1)
        .toString()
        .padStart(3, "0")}`;

      // Thêm dữ liệu mới vào collection "levels"
      await db.collection("levels").add({
        ...newLevel,
        code: newCode,
      });

      // Trả về dữ liệu đã được tạo mới
      return { ...newLevel, code: newCode };
    } catch (err) {
      throw err;
    }
  }
);

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
      })
      .addCase(
        createLevel.fulfilled,
        (state, action: PayloadAction<LevelData>) => {
          state.levels.push(action.payload);
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(createLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLevel.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default levelSlice.reducer;
