// src/Redux/servicesSlice.ts
// ... (các import khác)

import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "./firebase";
import { RootState } from "./store";

// Định nghĩa kiểu dữ liệu cho bản ghi dịch vụ
// src/Redux/servicesSlice.ts
// ... (các import khác)

// Định nghĩa kiểu dữ liệu cho bản ghi dịch vụ
export interface ServiceData2 {
  id?: string;
  code: string;
  description: string;
  name: string;
  autoIncrease?: boolean;
  fromNumber: number;
  toNumber: number;
  activeStatus: string;
  // Thêm trường codes để lưu danh sách mã trực tiếp trong dịch vụ
  codes?: string[]; // Chúng ta sẽ lưu trường codes như một mảng trống ban đầu
}

// Khởi tạo trạng thái ban đầu
interface ServiceState2 {
  services2: ServiceData2[];
  loading: boolean;
  error: string | null;
}
const initialState: ServiceState2 = {
  services2: [],
  loading: false,
  error: null,
};

// Hàm tạo danh sách mã dựa trên giá trị từ fromNumber đến toNumber
const generateCodes = (
  fromNumber: number,
  toNumber: number,
  baseCode: string
) => {
  const codes: string[] = [];
  for (let i = fromNumber; i <= toNumber; i++) {
    codes.push(`${baseCode}${i.toString().padStart(3, "0")}`);
  }
  return codes;
};

// Thunk để thêm dịch vụ vào Firebase
export const addService = createAsyncThunk(
  "services2/addService",
  async (serviceData: ServiceData2) => {
    const { codes, fromNumber, toNumber, ...rest } = serviceData;

    // Tạo danh sách mã dựa trên giá trị từ fromNumber đến toNumber
    const generatedCodes = generateCodes(
      fromNumber,
      toNumber,
      serviceData.code
    );

    // Lưu trường codes vào serviceData
    const serviceDataWithCodes: ServiceData2 = {
      ...rest,
      codes: generatedCodes,
      fromNumber, // Include the fromNumber property
      toNumber,
    };

    // Lưu thông tin dịch vụ vào Firebase
    const serviceRef = await db
      .collection("services")
      .add(serviceDataWithCodes);
    return { id: serviceRef.id, ...serviceDataWithCodes };
  }
);
export const updateService = createAsyncThunk(
  "services2/updateService",
  async (updatedServiceData: ServiceData2, { dispatch }) => {
    const serviceId = updatedServiceData.id;
    if (!serviceId) {
      throw new Error("Service ID is missing.");
    }

    const { id, code, fromNumber, toNumber, ...rest } = updatedServiceData;

    // Cập nhật thông tin dịch vụ trong Firebase dựa trên ID
    await db
      .collection("services")
      .doc(serviceId)
      .update({
        ...rest,
        code,
        fromNumber,
        toNumber,
      });

    // Tạo danh sách mã mới dựa trên fromNumber, toNumber và code
    const updatedCodes = generateCodes(fromNumber, toNumber, code);

    // Dispatch action để cập nhật mã trong Redux store
    dispatch(updateServiceCodes({ id: serviceId, codes: updatedCodes }));

    // Cập nhật trường codes trong serviceDataWithUpdatedCodes
    const serviceDataWithUpdatedCodes: ServiceData2 = {
      ...updatedServiceData,
      codes: updatedCodes,
    };

    return serviceDataWithUpdatedCodes;
  }
);
export const updateServiceCodes = createAction<{ id: string; codes: string[] }>(
  "services2/updateServiceCodes"
);

const servicesSlice2 = createSlice({
  name: "services2",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Xử lý khi Thunk thêm dịch vụ được thực thi thành công
    builder.addCase(addService.fulfilled, (state: any, action) => {
      state.services2.push(action.payload);
    });

    builder.addCase(updateService.fulfilled, (state: any, action) => {
      const updatedServiceData = action.payload;
      const serviceIndex = state.services2.findIndex(
        (service: { id: string | undefined }) =>
          service.id === updatedServiceData.id
      );
      if (serviceIndex !== -1) {
        state.services2[serviceIndex] = updatedServiceData;
      }
    });

    builder.addCase(updateServiceCodes, (state, action) => {
      const { id, codes } = action.payload;
      const serviceIndex = state.services2.findIndex(
        (service) => service.id === id
      );
      if (serviceIndex !== -1) {
        state.services2[serviceIndex].codes = codes;
      }
    });
  },
});
export const selectServiceById = (state: RootState, serviceId: string) => {
  return state.services2.services2.find((service) => service.id === serviceId);
};

export default servicesSlice2.reducer;

// Lấy danh sách dịch vụ từ state
