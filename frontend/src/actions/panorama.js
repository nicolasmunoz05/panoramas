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

// Agregar Evento
//   export const productNew = (products) => {
//   return async (dispatch) => {
//     try {
//       const resp = await fetchWithToken("products", products, "POST");
//       const body = await resp.json();

//       if (body.ok) {
//         dispatch({ type: types.productNew, payload: products });
//         dispatch(productsLoaded());
//         Swal.fire("Success", "Producto guardado correctamente", "success");
//       }
//     } catch (error) {
//       Swal.fire("Error", "No se pudo guardar el producto", "error");
//     }
//   };
// };

// Update
// export const productEdited = (products) => {
//   return async (dispatch) => {
//     try {
//       const resp = await fetchWithToken(
//         `products/${products._id}`,
//         products,
//         "PUT"
//       );
//       const body = await resp.json();
//       if (body.ok) {
//         dispatch(productDataToEdit(products));
//       }
//     } catch (error) {
//       Swal.fire("Error", "No se pudo editar el producto", "error");
//     }
//   };
// };
