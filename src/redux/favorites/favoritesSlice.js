import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("favorites")) || [],
};

const favoritesSlice = createSlice({
  name: "favorites",

  initialState,

  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload;

      const exists = state.items.includes(id);

      if (exists) {
        state.items = state.items.filter(item => item !== id);
      } else {
        state.items.push(id);
      }

      localStorage.setItem(
        "favorites",
        JSON.stringify(state.items)
      );
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;