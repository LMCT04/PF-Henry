import axios from "axios";
import {
    POST_USERS,
    GET_USERS,
} from "../actionsType/usersAT"

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
        alert("Hubo un error al crear el usuario");
      }
    };
  };

export const getAllUsers = () => {
  return async function (dispatch) {
    try {
      const userData = await axios.get('http://localhost:3001/user')
      const users = userData.data
      dispatch({
        type: GET_USERS,
        payload: users,
      })
    } catch(error){
      console.log("Error: getAllUsers", error);
      alert("Hubo un error al obtener todos los usuarios.");
    }
  }
}