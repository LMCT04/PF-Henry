import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  GET_CART_BY_ID,
  UPDATE_CART_QUANTITY
} from "../actionsType/cartAT";
import  axios  from "axios";

const urlBackend = 'https://pf-backend-skye.onrender.com'

export const addToCart = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${urlBackend}/cart/add`,
        payload
      );
      const addedProduct = response.data;

      dispatch({
        type: ADD_TO_CART,
        payload: addedProduct,
      });
    } catch (error) {
      console.log("Error: addProduct", error);
      alert("Hubo un error al agregar el producto al carrito.");
    }
  };
};

export const removeFromCart = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${urlBackend}/cart/remove`,
        payload
      );
      const removedProduct = response.data;

      dispatch({
        type: REMOVE_FROM_CART,
        payload: removedProduct,
      });
    } catch (error) {
      console.log("Error: removeProduct", error);
      alert("Hubo un error al remover el producto del carrito.");
    }
  };
};

export const getCartById = (userId) => {  
  return async (dispatch) => {
    try {
      const apiData = await axios.get(`${urlBackend}/cart/${userId}`);
      const cart = apiData.data;

      dispatch({
        type: GET_CART_BY_ID,
        payload: cart,
      });
    } catch (error) {
      console.log("Error: getCartById", error);
      // alert("No se encontró ningún carrito con ese ID.");
    }
  };
};

export const clearCart = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${urlBackend}/cart/clear`,
        {userId}
      );
      const clearedCart = response.data;

      dispatch({
        type: CLEAR_CART,
        payload: clearedCart,
      });
    } catch (error) {
      console.log("Error: removeProduct", error);
      alert("Hubo un error al limpiar el carrito.");
    }
  };
};

export const updateCartQuantity = (quantity) => ({
  type: UPDATE_CART_QUANTITY,
  payload: quantity,
});
