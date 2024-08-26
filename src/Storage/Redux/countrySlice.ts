import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  country: [],
  search: "",
};

export const countrySlice = createSlice({
  name: "Country",
  initialState: initialState,
  reducers: {
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setCountry, setSearchItem } = countrySlice.actions;
export const countryReducer = countrySlice.reducer;
