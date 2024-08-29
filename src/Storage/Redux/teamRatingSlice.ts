import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teamRating: [],
  search: "",
};

export const teamRatingSlice = createSlice({
  name: "TeamRating",
  initialState: initialState,
  reducers: {
    setTeamRating: (state, action) => {
      state.teamRating = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setTeamRating, setSearchItem } = teamRatingSlice.actions;
export const teamRatingReducer = teamRatingSlice.reducer;
