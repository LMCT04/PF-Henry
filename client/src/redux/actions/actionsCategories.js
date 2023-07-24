import axios from "axios";
import { GET_ALL_CATEGORIES } from "../actionsType/categoryAT";

const urlBackend = 'http://localhost:3001'

export const getAllCategories = () => {
    return async function (dispatch) {
        try {
            const categoryData = await axios.get(`${urlBackend}/category`);
            const category = categoryData.data;
            dispatch({
                type: GET_ALL_CATEGORIES,
                payload: category,
            });
        } catch (error) {
            console.log("Error: getAllCategories", error);
            alert("Hubo un error al obtener todas las categorias.");
        }
    };
};
