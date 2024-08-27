import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  match: [],
  search: "",
};

export const matchSlice = createSlice({
  name: "Match",
  initialState: initialState,
  reducers: {
    setMatch: (state, action) => {
      state.match = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setMatch, setSearchItem } = matchSlice.actions;
export const matchReducer = matchSlice.reducer;
