import { types } from "./../types/types";

const initialState = {
  panoramas: [],
  error: null,
  loading: false,
  panoramasEdit: null,
  panoramasDelete: null,
};

export const panoramasReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.panoramaNew:
      return {
        ...state,
        panoramas: [...state.panoramas, action.payload],
      };

    case types.getPanoramas:
      return {
        ...state,
        panoramas: [...action.payload],
      };

    case types.panoramaUpdate:
      return {
        ...state,
        panoramasEdit: action.payload,
      };

    case types.panoramasDelete:
      return {
        ...state,
        panoramasDelete: action.payload,
      };

    case types.panoramasDeleted:
      return {
        ...state,
        panoramas: state.panoramas.filter(
          (panorama) => panorama._id !== state.panoramasDelete
        ),
        panoramasDelete: null,
      };

    default:
      return state;
  }
};
