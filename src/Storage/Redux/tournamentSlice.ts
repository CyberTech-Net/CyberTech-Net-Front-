import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tournament: [],
  search: "",
};

export const tournamentSlice = createSlice({
  name: "Tournament",
  initialState: initialState,
  reducers: {
    setTournament: (state, action) => {
      state.tournament = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setTournament, setSearchItem } = tournamentSlice.actions;
export const tournamentReducer = tournamentSlice.reducer;
