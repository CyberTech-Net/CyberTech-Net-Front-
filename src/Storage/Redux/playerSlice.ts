import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  player: [],
  search: "",
};

export const playerSlice = createSlice({
  name: "Player",
  initialState: initialState,
  reducers: {
    setPlayer: (state, action) => {
      state.player = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setPlayer, setSearchItem } = playerSlice.actions;
export const playerReducer = playerSlice.reducer;
