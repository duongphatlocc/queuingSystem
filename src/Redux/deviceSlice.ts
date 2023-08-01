import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "./firebase";

export interface DeviceData {
  idDevice: string;
  name: String;
  address: String;
  activeStatus: String;
  connectionStatus: String;
  serviceUse: String;
}

interface DeviceState {
  device: DeviceData[];
  loading: boolean;
  error: string | null;
}

const initialState: DeviceState = {
  device: [],
  loading: false,
  error: null,
};

export const fetchDevice = createAsyncThunk("device/fetchDevice", async () => {
  try {
    // Make the API request to fetch the device data
    const response = await db.collection("devices").get();

    // Extract the data from the Firestore response and convert it to an array of DeviceData objects
    const data: DeviceData[] = [];
    response.forEach((doc) => data.push(doc.data() as DeviceData));

    return data; // This data will be passed as the action.payload in the reducer.
  } catch (error) {
    // If there's an error, handle it here
    throw Error("Failed to fetch device data.");
  }
});

const deviceSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchDevice.fulfilled,
      (state, action: PayloadAction<DeviceData[]>) => {
        state.loading = false;
        state.device = action.payload; // Update the device state with the fetched data
      }
    );
    builder.addCase(fetchDevice.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDevice.rejected, (state:any, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default deviceSlice.reducer;
