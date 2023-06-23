const { User, Product } = require("../../../database.js"),
  { Op } = require("sequelize");
////En CRUDUser se definen todas las peticiones Create (Crear), Read (Leer), Update (Actualizar) y Delete (Borrar)

//definir funciones

const modelgetUserFromDatabase = async (mail) => {
  try {
    const user = await User.findAll({
      where: { mail: mail },
    });

    // Verificar si se encontró algún usuario
    if (user.length === 0) {
      throw new Error("Usuario no encontrado");
    }

    return {
      id: user[0].id,
      image: user[0].image,
      name: user[0].name,
      lastName: user[0].lastName,
      mail: user[0].mail,
      age: user[0].age,
      address: user[0].address,
      favorite: user[0].favorite,
      shoppingHistory: user[0].shoppingHistory,
      //role: user[0].role,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener el usuario");
  }
};

const modelgetAllUserFromDatabase = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.log(`Error en getAllUsersFromDatabase ${error}`);
    throw new Error("Error en al obtener los usuarios");
  }
};

const modelpostUserInDatabase = async (
  name,
  lastName,
  image,
  mail,
  password,
  age,
  address,
  favorite,
  shoppingHistory,
  //role
) => {
  //if (!["admin", "user", "superAdmin"].includes(role)) {
  //  throw new Error("El valor de 'role' no es válido");
  //}
  let [newUser, created] = await User.findOrCreate({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    defaults: {
      name,
      lastName,
      image,
      mail,
      password,
      age,
      address,
      favorite,
      shoppingHistory,
      //role,
    },
  });
  if (!created) {
    throw new Error("El usuario ya existe");
  }
  return newUser;
};

module.exports = {
  //exportar cada funcion
  modelgetUserFromDatabase,
  modelpostUserInDatabase,
  modelgetAllUserFromDatabase,
};
