//destructurar todas las funciones de los modelos aca
const {
  moduleGetProductFromDatabaseByName,
  moduleGetAllProductFromDatabase,
  modulePostProduct,
  moduleGetProductById,
  modulePutStatusProduct,
  modulePutUpdateProduct,
} = require("./modules/CRUDProduct");

//definir funciones

const getProducts = async (name) => {
  try {
    const dataBaseProducts = await (name
      ? moduleGetProductFromDatabaseByName(name)
      : moduleGetAllProductFromDatabase());
    return dataBaseProducts;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
};

const postCreateProduct = async (newProduct) => {
  try {
    return await modulePostProduct(newProduct);
  } catch (error) {
    console.error("Error al crear usuario", error);
  }
};

const getProductById = async (id) => {
  try {
    return await moduleGetProductById(id);
  } catch (error) {
    console.error(`Error al encontrar el usuario con id: ${id}`, error);
  }
};
const putProduct = async (status, id, upProduct) => {
  try {
    const updatedProduct = upProduct
      ? await modulePutUpdateProduct(id, upProduct)
      : await modulePutStatusProduct(id, status);
    return updatedProduct;
  } catch (error) {
    console.error(error);
  }
};
module.exports = {
  //exportar cada funcion
  getProducts,
  postCreateProduct,
  getProductById,
  putProduct,
};
