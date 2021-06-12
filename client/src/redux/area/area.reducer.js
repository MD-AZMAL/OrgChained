import areaActionTypes from "./area.types";

const INITIAL_STATE = {
  currentAreas: null,
  currentArea: null,
};

const areaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case areaActionTypes.SET_CURRENT_AREA:
      return {
        ...state,
        currentArea: action.payload,
      };
    case areaActionTypes.SET_CURRENT_AREAS:
      return {
        ...state,
        currentAreas: action.payload,
      };

    case areaActionTypes.SET_CURRENT_AREA_NULL:
      return {
        ...state,
        currentArea: null,
      };

    case areaActionTypes.SET_CURRENT_AREAS_NULL:
      return {
        ...state,
        currentAreas: null,
      };
    default:
      return state;
  }
};

export default areaReducer;