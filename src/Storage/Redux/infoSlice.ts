import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: [],
  search: "",
};

export const infoSlice = createSlice({
  name: "Info",
  initialState: initialState,
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setInfo, setSearchItem } = infoSlice.actions;
export const infoReducer = infoSlice.reducer;
