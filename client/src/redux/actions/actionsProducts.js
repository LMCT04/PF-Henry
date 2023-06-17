
import axios from 'axios'
import { ORDER_ALPHABETIC,ORDER_PRICE, GET_ALL_PRODUCTS, CREATE_PRODUCT, FILTER_CATEGORY, FILTER_TYPE, RESET_FILTERS, FILTER_CATEGORY_AND_TYPE } from "../actionsType/productsAT";


export const orderAlphabetic = (payload) => {
    return {
      type: ORDER_ALPHABETIC,
      payload,
    };
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
    type: RESET_FILTERS
  };
};

  export const getAllProducts = () => {
    return async function (dispatch) {
      try {
        const apiData = await axios.get('http://localhost:3001/product')
        const product = apiData.data
        dispatch ({
          type: GET_ALL_PRODUCTS,
          payload: product,
        })
      } catch (error) {
        console.log('Error getAllproducts')
      }
    }
  }

  export const createProduct = (payload) => {
    const request = {
      url: "http://localhost:3001/product/createProduct",
      method: "POST",
      data: payload,
    }
    return async (dispatch) => {
      console.log(request)
      return axios(request).then((response) => {
        dispatch({
          type: CREATE_PRODUCT,
          payload: response.data
        })
      })
    }
  }

  export const filterCategoryAndType = (category, type) => {
    return {
      type: FILTER_CATEGORY_AND_TYPE,
      category,
      type
    };
  };
