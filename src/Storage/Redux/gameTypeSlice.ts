import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameItem: [],
  search: "",
};

export const gameTypeSlice = createSlice({
  name: "GameType",
  initialState: initialState,
  reducers: {
    setGameItem: (state, action) => {
      state.gameItem = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setGameItem, setSearchItem } = gameTypeSlice.actions;
export const gameTypeReducer = gameTypeSlice.reducer;
