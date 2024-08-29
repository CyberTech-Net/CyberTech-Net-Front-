import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teamplayer: [],
  search: "",
};

export const teamPlayerSlice = createSlice({
  name: "TeamPlayer",
  initialState: initialState,
  reducers: {
    setTeamPlayer: (state, action) => {
      state.teamplayer = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setTeamPlayer, setSearchItem } = teamPlayerSlice.actions;
export const teamPlayerReducer = teamPlayerSlice.reducer;