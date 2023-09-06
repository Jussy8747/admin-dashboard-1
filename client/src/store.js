import { configureStore } from "@reduxjs/toolkit";
import globalSliceReducer from "./slices/globalSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { globalSliceApi } from "./slices/globalSliceApi";

export const store = configureStore({
  reducer: {
    globalSlice: globalSliceReducer,
    [globalSliceApi.reducerPath]: globalSliceApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(globalSliceApi.middleware),
});
