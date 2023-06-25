import axios from "axios";
import {
  POST_USERS,
  GET_USERS,
  UPDATE_USER
} from "../actionsType/usersAT";

export const createUsers = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:3001/user", payload);
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

export const getAllUsers = () => {
  return async function (dispatch) {
    try {
      const userData = await axios.get("http://localhost:3001/user");
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
      await axios.put("http://localhost:3001/user", updatedUser);
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

