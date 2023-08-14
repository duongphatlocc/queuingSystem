import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "./firebase";


export interface ServiceData {
id?: string; // Id không bắt buộc, do nó sẽ được Firebase tự động tạo
  code: string;
  description: string;
  name: string;
  autoIncrease?: boolean;
  fromNumber: number;
  toNumber: number;
  activeStatus:string;
}
interface ServiceState {
  services: ServiceData[];
  loading: boolean;
  error: string | null;
}
const initialState: ServiceState = {
  services: [],
  loading: false,
  error: null,
};
export const fetchService = createAsyncThunk(
  "services/fetchService",
  async () => {
    try {
      const dataRef = await db.collection("services").get();
      const data: ServiceData[] = [];
      dataRef.forEach((doc) => {
        const service = doc.data() as ServiceData;
        service.id = doc.id;
        data.push(service);
      });
      return data;
    } catch (err) {
      throw err;
    }
  }
);
const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchService.fulfilled,
        (state, action: PayloadAction<ServiceData[]>) => {
          state.loading = false;
          state.services = action.payload;
        }
      )
      .addCase(fetchService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchService.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default serviceSlice.reducer;
