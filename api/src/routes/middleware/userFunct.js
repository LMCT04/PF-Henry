//destructurar todas las funciones de los modelos aca
//destructurar todas las funciones de los modelos aca
const {
  modelgetUserFromDatabase,
  modelpostUserInDatabase,
  modelgetAllUsersFromDatabase,
} = require("./modules/CRUDUser");

//definir funciones

const getUser = async (mail) => {
  try {
    const databaseUser = await (mail
      ? modelgetUserFromDatabase(mail)
      : modelgetAllUsersFromDatabase());
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

module.exports = {
  getUser,
  postUser,
  //exportar cada funcion
};
