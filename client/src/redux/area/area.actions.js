import areaActionTypes from "./area.types";

export const setCurrentArea = (area) => ({
  type: areaActionTypes.SET_CURRENT_AREA,
  payload: area,
});

export const setCurrentAreas = (areas) => ({
  type: areaActionTypes.SET_CURRENT_AREAS,
  payload: areas,
});

export const setCurrentAreaNull = () => ({
  type: areaActionTypes.SET_CURRENT_AREA_NULL,
});

export const setCurrentAreasNull = () => ({
  type: areaActionTypes.SET_CURRENT_AREAS_NULL,
});
