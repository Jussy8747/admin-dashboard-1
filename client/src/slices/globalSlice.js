import { createSlice } from "@reduxjs/toolkit";

const initailState = {
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
};

export const globalSlice = createSlice({
  name: "globalSlice",
  initialState: initailState, // initial state of the store
  reducers: {
    changeMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { changeMode } = globalSlice.actions;
export default globalSlice.reducer;
