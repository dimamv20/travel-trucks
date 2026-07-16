import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  form: "",
  equipment: [],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,

  reducers: {
    setFilters(state, action) {
      state.location = action.payload.location;
      state.form = action.payload.form;
      state.equipment = action.payload.equipment;
    },

    clearFilters() {
      return initialState;
    },
  },
});

export const { setFilters, clearFilters } = filtersSlice.actions;

export default filtersSlice.reducer;