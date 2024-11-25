import fetchWithToken from "../utils/fetch";
import { types } from "../types/types";

// Obtener todos los eventos (público)
export const getAllEvents = () => {
  return async (dispatch) => {
    try {
      // Solicitud pública, useAuth = false
      const evento = await fetchWithToken("evento", null, "GET", false);
      dispatch({ type: types.getEvents, payload: evento });
    } catch (error) {
      console.error("Error al obtener los eventos:", error);
      // Swal.fire("Error", "No se pudieron obtener los eventos", "error");
    }
  };
};

// Agregar un evento (privado)
export const eventoNew = (eventos) => {
  return async (dispatch) => {
    try {
      // Solicitud privada, useAuth por defecto es true
      const body = await fetchWithToken("eventos", eventos, "POST");
      if (body) {
        dispatch({ type: types.eventoNew, payload: eventos });
        // Swal.fire("Success", "Evento guardado correctamente", "success");
      }
    } catch (error) {
      console.error("Error al guardar el evento:", error);
      // Swal.fire("Error", "No se pudo guardar el evento", "error");
    }
  };
};

// Editar un evento (privado)
export const eventoEdited = (eventos) => {
  return async (dispatch) => {
    try {
      // Solicitud privada, useAuth por defecto es true
      const body = await fetchWithToken(
        `evento/${eventos._id}`,
        eventos,
        "PUT"
      );

      // Valida si la actualización fue exitosa
      if (body.message === "Evento actualizado con éxito") {
        dispatch({ type: types.updateEvento, payload: eventos });
        dispatch(getAllEvents()); // Refresca la lista de eventos
      }
    } catch (error) {
      console.error("Error al editar el evento:", error);
      // Swal.fire("Error", "No se pudo editar el evento", "error");
    }
  };
};
