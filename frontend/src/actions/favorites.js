import { types } from "../types/types";

// Acción para agregar a favoritos
export const addToFavorites = (item) => {
  return {
    type: types.addFavorite,
    payload: item,
  };
};

// Acción para eliminar de favoritos
export const removeFromFavorites = (id) => {
  return {
    type: types.removeFavorite,
    payload: id,
  };
};

// Acción para obtener todos los favoritos (si es necesario)
export const getFavorites = () => {
  return (dispatch) => {
    // Aquí podrías hacer una llamada a la API si necesitas obtener los favoritos desde un servidor
    // Por ahora, simplemente podrías despachar una acción que contenga los favoritos
    dispatch({
      type: types.getFavorites,
      payload: [], // Aquí iría la lista de favoritos si la obtienes de un servidor
    });
  };
};