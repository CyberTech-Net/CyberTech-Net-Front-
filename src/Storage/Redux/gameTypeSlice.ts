import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameItem: [],
  search: "",
};

export const gameTypeSlice = createSlice({
  name: "GameType",
  initialState: initialState,
  reducers: {
    setGameType: (state, action) => {
      state.gameItem = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setGameType, setSearchItem } = gameTypeSlice.actions;
export const gameTypeReducer = gameTypeSlice.reducer;
