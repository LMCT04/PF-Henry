////En CRUDUser se definen todas las peticiones Create (Crear), Read (Leer), Update (Actualizar) y Delete (Borrar)
const { User, Product } = require("../../../database.js"),
  { Op } = require("sequelize");

const modelgetUserFromDatabase = async (id) => {
  try {
    const user = await User.findByPk(id);
    return {
      id: user.id,
      image: user.image,
      name: user.name,
      lastName: user.lastName,
      mail: user.mail,
      age: user.age,
      address: user.address,
      favorite: user.favorite,
      shoppingHistory: user.shoppingHistory,
    };
  } catch (error) {
    console.error(error);
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
  shoppingHistory
) => {
  let [newUser, created] = await findOrCreate({
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
    },
  });
  if (!created) {
    throw new Error("El usuario ya existe");
  }
  return newUser;
};





//definir funciones

module.exports = {
  //exportar cada funcion
  modelgetUserFromDatabase,
  modelpostUserInDatabase,
 
};
