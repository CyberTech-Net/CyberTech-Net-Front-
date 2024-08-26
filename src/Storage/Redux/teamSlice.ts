import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  team: [],
  search: "",
};

export const teamSlice = createSlice({
  name: "Team",
  initialState: initialState,
  reducers: {
    setTeam: (state, action) => {
      state.team = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setTeam, setSearchItem } = teamSlice.actions;
export const teamReducer = teamSlice.reducer;
