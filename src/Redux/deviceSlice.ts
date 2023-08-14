// import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { db } from "./firebase";

// export interface DeviceData {
//   id: string;
//   device: string;
//   name: string;
//   address: string;
//   activeStatus: string;
//   connectionStatus: string;
//   serviceUse: string;
// }

// interface DeviceState {
//   device: DeviceData[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: DeviceState = {
//   device: [],
//   loading: false,
//   error: null,
// };

// export const fetchDevice = (): AppThunk => async (dispatch: (arg0: any) => void, getState: any) => {
//   dispatch(fetchDevice());
//     const serviceCollectionRef = collection(firestore, "devices");
//     const querySnapshot = await getDocs(serviceCollectionRef);
//       const rows: DeviceData[] = querySnapshot.docs.map((doc) => {
//         const data = doc.data() as DeviceData;
//         const id = doc.id;
//         return { ...data, id }; // Tạo object mới và gán giá trị cho thuộc tính id
//       });
//       dispatch(fetchDevice(rows));

// };
// // export const fetchDevice = createAsyncThunk("device/fetchDevice", async () => {
// //   try {
// //     // Make the API request to fetch the device data
// //     const response = await db.collection("devices").get();

// //     // Extract the data from the Firestore response and convert it to an array of DeviceData objects
// //     const data: DeviceData[] = [];

// //     response.forEach((doc) => data.push(doc.data() as DeviceData));

// //     return data; // This data will be passed as the action.payload in the reducer.
// //   } catch (error) {
// //     // If there's an error, handle it here
// //     throw new Error("Failed to fetch device data.");
// //   }
// // });

// const deviceSlice = createSlice({
//   name: "device",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(
//       fetchDevice.fulfilled,
//       (state, action: PayloadAction<DeviceData[]>) => {
//         state.loading = false;
//         state.device = action.payload; // Update the device state with the fetched data
//       }
//     );
//     builder.addCase(fetchDevice.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(fetchDevice.rejected, (state: any, action) => {
//       state.loading = false;
//       state.error = action.error.message;
//     });
//   },
// });

// export default deviceSlice.reducer;

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "./firebase";

export interface DeviceData {
  id?: string;
  // Add the 'id' field for storing the Firestore document ID
  device: string;
  name: string;
  address: string;
  activeStatus: string;
  connectionStatus: string;
  serviceUse: string;
  userName: string;
  typeOfDevice: string;
  password: string;
}

interface DeviceState {
  devices: DeviceData[];
  loading: boolean;
  error: string | null;
}

const initialState: DeviceState = {
  devices: [],
  loading: false,
  error: null,
};

export const fetchDevice = createAsyncThunk("devices/fetchDevice", async () => {
  try {
    // Make the API request to fetch the device data
    const response = await db.collection("devices").get();

    // Extract the data from the Firestore response and convert it to an array of DeviceData objects
    const data: DeviceData[] = [];

    response.forEach((doc) => {
      const device = doc.data() as DeviceData;
      device.id = doc.id; // Add the 'id' property to the device object
      data.push(device);
    });

    return data; // This data will be passed as the action.payload in the reducer.
  } catch (error) {
    // If there's an error, handle it here
    throw new Error("Failed to fetch device data.");
  }
});
export const addDevices = createAsyncThunk(
  "devices/addDevice",
  async (device: DeviceData) => {
    try {
      // Loại bỏ trường không cần thiết "typeOfDevice.disabled"

      const docRef = await db.collection("devices").add(device);
      device.id = docRef.id;
      return device;
    } catch (error) {}
  }
);
export const updateDevice = createAsyncThunk(
  "debices/updateDevice",
  async (device: DeviceData) => {
    try {
      await db.collection("devices").doc(device.id).update(device);
      return device;
    } catch (err) {
      throw err;
    }
  }
);

const deviceSlice = createSlice({
  name: "devices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchDevice.fulfilled,
        (state, action: PayloadAction<DeviceData[]>) => {
          state.loading = false;
          state.devices = action.payload; // Update the device state with the fetched data
        }
      )
      .addCase(fetchDevice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDevice.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addDevices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDevices.fulfilled, (state: any, action) => {
        state.loading = false;
        state.device.push(action.payload);
      })
      .addCase(addDevices.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateDevice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDevice.fulfilled, (state, action) => {
        state.loading = false;
        const updateDevice = action.payload;
        const index = state.devices.findIndex(
          (device) => device.id === updateDevice.id
        );
        if (index !== -1) {
          state.devices[index] = updateDevice;
        }
      })
      .addCase(updateDevice.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default deviceSlice.reducer;
