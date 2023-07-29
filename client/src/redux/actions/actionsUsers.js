import axios from "axios";
import { auth } from "../../firebase/config";

import {
    POST_USERS,
    GET_USERS,
    UPDATE_USER,
    SET_USER,
    USER_BY_NAME,
    USER_ORDER_ALPHABETIC,
    ROLE_UPDATE,
} from "../actionsType/usersAT";

const urlBackend = 'https://pf-backend-skye.onrender.com'

export const createUsers = (payload) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                `${urlBackend}/user`,
                payload
            );
            const createdUsers = response.data;

            dispatch({
                type: POST_USERS,
                payload: createdUsers,
            });
        } catch (error) {
            console.log("Error: createUsers", error);
        }
    };
};

export const getUserbyName = (fullName) => {
    return async (dispatch) => {
        try {
            const userData = await axios.get(
                `${urlBackend}/user?fullName=${fullName}`
            );
            const response = userData.data;

            return dispatch({
                type: USER_BY_NAME,
                payload: response,
            });
        } catch (error) {
            console.log("Error: getUserbyName", error);
            alert("No se encontró ningún usuario con ese nombre.");
            return Promise.reject(error);
        }
    };
};

export const getAllUsers = () => {
    return async function (dispatch) {
        try {
            const userData = await axios.get(`${urlBackend}/user`);
            const users = userData.data;
            dispatch({
                type: GET_USERS,
                payload: users,
            });
        } catch (error) {
            console.log("Error: getAllUsers", error);
            alert("Hubo un error al obtener todos los usuarios.");
        }
    };
};

export const updateUser = (updatedUser) => {
    return async function (dispatch) {
        try {
            await axios.put(`${urlBackend}/user`, updatedUser);
            dispatch({
                type: UPDATE_USER,
                payload: updatedUser,
            });
            alert("Usuario actualizado con éxito");
        } catch (error) {
            console.log("Error: updateUser", error);
            alert("Hubo un error al actualizar el usuario");
        }
    };
};

export const roleUpdate = (mail, rol) => {
    return async function (dispatch) {
        try {
            const response = await axios.put(`${urlBackend}/user`, {
                mail: mail,
                rol: rol,
            });
            dispatch({
                type: ROLE_UPDATE,
                payload: response.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

export const orderAlphabetic = (value) => {
    if (value === "asc") {
        return { type: USER_ORDER_ALPHABETIC, payload: "asc" };
    } else if (value === "desc") {
        return { type: USER_ORDER_ALPHABETIC, payload: "desc" };
    } else {
        return { type: USER_ORDER_ALPHABETIC, payload: "none" };
    }
};
