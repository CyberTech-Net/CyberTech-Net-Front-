import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  matchCard: [],
  search: "",
};

export const matchCardSlice = createSlice({
  name: "MatchCard",
  initialState: initialState,
  reducers: {
    setMatchCard: (state, action) => {
      state.matchCard = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setMatchCard, setSearchItem } = matchCardSlice.actions;
export const matchCardReducer = matchCardSlice.reducer;