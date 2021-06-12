import { createSelector } from "reselect";

const selectArea = (state) => state.area;

export const selectCurrentAreas = createSelector(
  [selectArea],
  (area) => area.currentAreas
);

export const selectCurrentArea = createSelector(
  [selectArea],
  (area) => area.currentArea
);
