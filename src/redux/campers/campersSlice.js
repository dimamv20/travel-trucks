import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCampers,
  fetchCamperById,
} from "./campersOperations";

const initialState = {
  items: [],
  selectedCamper: null,
  isLoading: false,
  error: null,
  visibleCount: 4,
};

const campersSlice = createSlice({
  name: "campers",
  initialState,

  reducers: {
    loadMore(state) {
      state.visibleCount += 4;
    },

    clearSelectedCamper(state) {
      state.selectedCamper = null;
    },
    resetVisibleCount(state) {
      state.visibleCount = 4;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchCampers.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items || action.payload;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchCamperById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCamper = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  loadMore,
  resetVisibleCount,
  clearSelectedCamper,
} = campersSlice.actions;

export default campersSlice.reducer;