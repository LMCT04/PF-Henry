const {
  modelgetUserFromDatabase,
  modelpostUserInDatabase,
  modelgetAllUserFromDatabase,
  modelupdatePasswordInDatabase,
  modelupdateUsernameInDatabase,
} = require("./modules/CRUDUser");

const updateUserInDatabase = async (mail, password, userName) => {
  try {
    const user = await modelgetUserFromDatabase(mail);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    if (password) {
      await modelupdatePasswordInDatabase(mail, password);
    }

    if (userName) {
      await modelupdateUsernameInDatabase(mail, userName);
    }

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Error al actualizar el usuario");
  }
};

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
  updateUserInDatabase,
};
