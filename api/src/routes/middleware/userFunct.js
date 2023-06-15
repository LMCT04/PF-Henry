//destructurar todas las funciones de los modelos aca
//destructurar todas las funciones de los modelos aca
const {
  modelgetUserFromDatabase,
  modelpostUserInDatabase,
} = require("./modules/CRUDUser");

//ejemplo de middleare

const getUser = async (id) => {
  try {
    const databaseUser = await modelgetUserFromDatabase(id);
    return databaseUser;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw new Error("Error al obtener el usuario");
  }
};

const postUser = async (
  name,
  lastName,
  image,
  mail,
  password,
  age,
  address,
  favorite,
  shoppingHistory
) => {
  try {
    const createUsuario = await modelpostUserInDatabase(
      name,
      lastName,
      image,
      mail,
      password,
      age,
      address,
      favorite,
      shoppingHistory
    );
    return createUsuario;
  } catch (error) {
    console.error("Error al crear al usuario:", error);
    throw new Error("Error al crear el usuario");
  }
};
// const getAllUser = async (name) => {
//   //ejemplo de condicional
//   if (name) {
//     await getUserFromDataBaseByName ---> esta funcion se tiene que definir en models y es la que hace la logica pura, se tiene que destructurar y requerir..
//   } else {
//     await getAllUserFromDataBase  ---> esta funcion se tiene que definir en models y es la que hace la logica pura, se tiene que destructurar y requerir..
//   }
//  resto del codigo...
// }

//definir funciones

module.exports = {
  getUser,
  postUser,
  //exportar cada funcion
};
