import fetchWithToken from "../utils/fetch";
import { types } from "../types/types";

export const getAllPanoramas = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken("panorama");
      const body = await resp.json();

      const panorama = body;
      dispatch({ type: types.getPanoramas, payload: panorama });
    } catch (error) {
      //Swal.fire("Error", "No se pudieron obtener los productos", "error");
    }
  };
};

//Agregar Panorama
export const panoramaNew = (panoramas) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken("panoramas", panoramas, "POST");
      const body = await resp.json();
      if (body) {
        dispatch({ type: types.panoramaNew, payload: panoramas });
        // Swal.fire("Success", "Producto guardado correctamente", "success");
      }
    } catch (error) {
      // Swal.fire("Error", "No se pudo guardar el producto", "error");
    }
  };
};

//Update
export const panoramaEdited = (panoramas) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(
        `panorama/${panoramas._id}`,
        panoramas,
        "PUT"
      );
      const body = await resp.json();

      // aca debe devolver un booleano, un true o false para que la dependencia no sea de un mensaje que pueda cambiar
      if (body.message === "Panorama actualizado con éxito") {
        dispatch({ type: types.updatePanorama, payload: panoramas });
        dispatch(getAllPanoramas());
      }
    } catch (error) {
      //Swal.fire("Error", "No se pudo editar el producto", "error");
    }
  };
};
