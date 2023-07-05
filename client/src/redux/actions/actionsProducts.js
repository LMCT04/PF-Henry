import axios from "axios";
import {

  ORDER_ALPHABETIC,
  ORDER_PRICE,
  GET_ALL_PRODUCTS,
  CREATE_PRODUCT,
  FILTER_CATEGORY,
  FILTER_TYPE,
  RESET_FILTERS,
  FILTER_CATEGORY_AND_TYPE,
  GET_BY_NAME,
  GET_BY_ID,
  CLEAR_STATE,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  SET_FAVORITE,
  SET_RATING,
  GET_RATING,

    ORDER_ALPHABETIC,
    ORDER_PRICE,
    GET_ALL_PRODUCTS,
    CREATE_PRODUCT,
    FILTER_CATEGORY,
    FILTER_TYPE,
    RESET_FILTERS,
    FILTER_CATEGORY_AND_TYPE,
    GET_BY_NAME,
    GET_BY_ID,
    CLEAR_STATE,
    ADD_FAVORITE,
    REMOVE_FAVORITE,
    SET_FAVORITE,

} from "../actionsType/productsAT";

export const orderAlphabetic = (value) => {
    if (value === "asc") {
        return { type: ORDER_ALPHABETIC, payload: "asc" };
    } else if (value === "desc") {
        return { type: ORDER_ALPHABETIC, payload: "desc" };
    } else {
        return { type: ORDER_ALPHABETIC, payload: "none" };
    }
};

export const orderPrice = (payload) => {
    return {
        type: ORDER_PRICE,
        payload,
    };
};

export const filterType = (payload) => {
    return {
        type: FILTER_TYPE,
        payload,
    };
};

export const filterCategory = (payload) => {
    return {
        type: FILTER_CATEGORY,
        payload,
    };
};

export const resetFilters = () => {
    return {
        type: RESET_FILTERS,
    };
};

export const getAllProducts = () => {
    return async function (dispatch) {
        try {
            const apiData = await axios.get("http://localhost:3001/product");
            const products = apiData.data;
            dispatch({
                type: GET_ALL_PRODUCTS,
                payload: products,
            });
        } catch (error) {
            console.log("Error: getAllProducts", error);
            alert("Hubo un error al obtener todos los productos.");
        }
    };
};

export const getByName = (name) => {
    return async (dispatch) => {
        try {
            const apiData = await axios.get(
                `http://localhost:3001/product?name=${name}`
            );
            const product = apiData.data;

            return dispatch({
                type: GET_BY_NAME,
                payload: product,
            });
        } catch (error) {
            console.log("Error: getByName", error);
            alert("No se encontró ningún producto con ese nombre.");
            return Promise.reject(error);
        }
    };
};

export const getById = (id) => {
    return async (dispatch) => {
        try {
            const apiData = await axios.get(
                `http://localhost:3001/product/${id}`
            );
            const product = apiData.data;

            dispatch({
                type: GET_BY_ID,
                payload: product,
            });
        } catch (error) {
            console.log("Error: getById", error);
            alert("No se encontró ningún producto con ese ID.");
        }
    };
};

export const createProduct = (payload) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                "http://localhost:3001/product/createProduct",
                payload
            );
            const createdProduct = response.data;

            dispatch({
                type: CREATE_PRODUCT,
                payload: createdProduct,
            });
        } catch (error) {
            console.log("Error: createProduct", error);
            alert("Hubo un error al crear el producto.");
        }
    };
};

export const filterCategoryAndType = (category, type) => {
    return {
        type: FILTER_CATEGORY_AND_TYPE,
        category,
        type,
    };
};

export const clearState = () => {
    return { type: CLEAR_STATE };
};

export const setFavorite = (productId) => {
    return {
        type: SET_FAVORITE,
        payload: productId,
    };
};
export const addFavorite = (productId) => {
    return {
        type: ADD_FAVORITE,
        payload: productId,
    };
};

export const removeFavorite = (productId) => {
    return {
        type: REMOVE_FAVORITE,
        payload: productId,
    };
};

export const addRating = (productId, userId, ratingValue) => {
  return async (dispatch) => {
    try {
      const response = await axios.put("http://localhost:3001/product/rating", {
        productId: productId,
        userId: userId,
        ratingValue: ratingValue,
      });
      console.log(response.data);
      // dispatch(getRating(productId));
    } catch (error) {
      console.error(error);
    }
  };
};
export const getRating = (productId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/product/rating/all`
      );
      const ratings = response.data;
      console.log(ratings);

      ratings.forEach((rating) => {
        const { value, productId: ratingProductId } = rating;
        console.log(value, ratingProductId);
        if (ratingProductId === productId) {
          dispatch(setRating(productId, value));
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const setRating = (productId, ratings) => {
  return {
    type: SET_RATING,
    payload: {
      productId,
      ratings,
    },
  };
};
