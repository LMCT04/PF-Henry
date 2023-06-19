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
} from "../actionsType/productsAT";

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
            console.log("Error getAllproducts");
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
            console.log("There is not a product with that name ", error);
            alert("There is not a product with that name ");
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
            console.log("There is not a product with that id ", error);
            alert("There is not a product with that id ");
        }
    };
};

export const createProduct = (payload) => {
    const request = {
        url: "http://localhost:3001/product/createProduct",
        method: "POST",
        data: payload,
    };
    return async (dispatch) => {
        /*
        console.log(request);
        return axios(request).then((response) => {
            dispatch({
                type: CREATE_PRODUCT,
                payload: response.data,
            });
        });
    };
};
*/

        console.log(request);
        return axios(request).then((response) => {
            dispatch({
                type: CREATE_PRODUCT,
                payload: response.data,
            });
        });
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