//destructurar todas las funciones de los modelos aca
//destructurar todas las funciones de los modelos aca
const {
  modelgetUserFromDatabase,
  modelpostUserInDatabase,
  modelgetAllUserFromDatabase,
} = require("./modules/CRUDUser");

//definir funciones

const getUser = async (mail) => {
  try {
    const databaseUser = await (mail
      ? modelgetUserFromDatabase(mail)
      : modelgetAllUserFromDatabase());
    return databaseUser;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw new Error("Error al obtener el usuario");
  }
};

const postUser = async (
  fullName,
  userName,
  image,
  mail,
  password,
  age,
  address,
  favorite,
  shoppingHistory,
  role
) => {
  try {
    const createUsuario = await modelpostUserInDatabase(
      fullName,
      userName,
      image,
      mail,
      password,
      age,
      address,
      favorite,
      shoppingHistory,
      role
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
