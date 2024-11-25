import { types } from "../types/types";

const initialState = {
  favorites: [],
};

export const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.addFavorite:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case types.removeFavorite:
      return {
        ...state,
        favorites: state.favorites.filter(item => item.id !== action.payload), // Asegúrate de que 'id' sea la propiedad correcta
      };

    case types.getFavorites:
      return {
        ...state,
        favorites: action.payload,
      };

    default:
      return state;
  }
};