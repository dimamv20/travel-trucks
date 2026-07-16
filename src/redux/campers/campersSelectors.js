export const selectCampers = state => state.campers.items;
export const selectIsLoading = state => state.campers.isLoading;
export const selectError = state => state.campers.error;
export const selectVisibleCount = state => state.campers.visibleCount;
export const selectSelectedCamper = state =>
  state.campers.selectedCamper;