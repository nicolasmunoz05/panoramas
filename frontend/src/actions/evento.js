import fetchWithToken from "../utils/fetch";
import { types } from "../types/types";

export const getAllEvents = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken("evento");
      const body = await resp.json();

      const evento = body;
      dispatch({ type: types.getEvents, payload: evento });
    } catch (error) {
      //Swal.fire("Error", "No se pudieron obtener los productos", "error");
    }
  };
};

//Agregar Evento
export const eventoNew = (eventos) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken("eventos", eventos, "POST");
      const body = await resp.json();
      if (body) {
        dispatch({ type: types.eventoNew, payload: eventos });
        // Swal.fire("Success", "Producto guardado correctamente", "success");
      }
    } catch (error) {
      // Swal.fire("Error", "No se pudo guardar el producto", "error");
    }
  };
};

//Update
export const eventoEdited = (eventos) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(
        `evento/${eventos._id}`,
        eventos,
        "PUT"
      );
      const body = await resp.json();

      // aca debe devolver un booleano, un true o false para que la dependencia no sea de un mensaje que pueda cambiar
      if (body.message === "Evento actualizado con éxito") {
        dispatch({ type: types.updateEvento, payload: eventos });
        dispatch(getAllEvents());
      }
    } catch (error) {
      //Swal.fire("Error", "No se pudo editar el producto", "error");
    }
  };
};
