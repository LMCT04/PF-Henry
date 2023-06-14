//destructurar todas las funciones de los modelos aca
const {
  getProductFromDatabaseByName,
  getAllProductFromDatabase,
  GetProductId
} = require("./models/CRUDProduct");

const getAllProducts = async (name) => {
  try {
    const dataBaseProducts = await (name
      ? getProductFromDatabaseByName(name)
      : getAllProductFromDatabase);
    return dataBaseProducts;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
};
//ejemplo de middleare
// const getAllProduct = async (name) => {
//   //ejemplo de condicional
//   if (name) {
//     await getProductFromDataBaseByName ---> esta funcion se tiene que definir en models y es la que hace la logica pura, se tiene que destructurar y requerir..
//   } else {
//     await getAllProductFromDataBase  ---> esta funcion se tiene que definir en models y es la que hace la logica pura, se tiene que destructurar y requerir..
//   }
//  resto del codigo...
// }

//definir funciones
const getProductById= async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto por ID" });
  }
}

module.exports = {
  getAllProducts,
  getProductById
  //exportar cada funcion
};
