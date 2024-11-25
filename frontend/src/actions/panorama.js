import fetchWithToken from "../utils/fetch";
import { types } from "../types/types";

// Obtener todos los panoramas (público)
export const getAllPanoramas = () => {
  return async (dispatch) => {
    try {
      // Solicitud pública, useAuth = false
      const panorama = await fetchWithToken("panorama", null, "GET", false);
      dispatch({ type: types.getPanoramas, payload: panorama });
    } catch (error) {
      console.error("Error al obtener los panoramas:", error);
      // Swal.fire("Error", "No se pudieron obtener los panoramas", "error");
    }
  };
};

// Agregar un panorama (privado)
export const panoramaNew = (panoramas) => {
  return async (dispatch) => {
    try {
      // Solicitud privada, useAuth por defecto es true
      const body = await fetchWithToken("panoramas", panoramas, "POST");
      if (body) {
        dispatch({ type: types.panoramaNew, payload: panoramas });
        // Swal.fire("Success", "Panorama guardado correctamente", "success");
      }
    } catch (error) {
      console.error("Error al guardar el panorama:", error);
      // Swal.fire("Error", "No se pudo guardar el panorama", "error");
    }
  };
};

// Editar un panorama (privado)
export const panoramaEdited = (panoramas) => {
  return async (dispatch) => {
    try {
      // Solicitud privada, useAuth por defecto es true
      const body = await fetchWithToken(
        `panorama/${panoramas._id}`,
        panoramas,
        "PUT"
      );

      // Valida si la actualización fue exitosa
      if (body.message === "Panorama actualizado con éxito") {
        dispatch({ type: types.updatePanorama, payload: panoramas });
        dispatch(getAllPanoramas()); // Refresca la lista de panoramas
      }
    } catch (error) {
      console.error("Error al editar el panorama:", error);
      // Swal.fire("Error", "No se pudo editar el panorama", "error");
    }
  };
};
