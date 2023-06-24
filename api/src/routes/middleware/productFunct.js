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

const getProducts = async (productName) => {
  try {
    const products = await (productName
      ? moduleGetProductFromDatabaseByName(productName)
      : moduleGetAllProductFromDatabase());
    return products;
  } catch (error) {
    throw new Error("Error al obtener los productos: " + error.message);
  }
};

const postCreateProduct = async (newProduct) => {
  if (!newProduct) {
    throw new Error(`No puede enviar informacion vacia o incompleta`);
  }
  try {
    return modulePostProduct(newProduct);
  } catch (error) {
    throw new Error(`Error al crear el producto: ${error.message}`);
  }
};

const getProductById = async (id) => {
  try {
    return await moduleGetProductById(id);
  } catch (error) {
    console.error(`Error al encontrar el usuario con id: ${id}`, error);
  }
};
const putProduct = async (id, status, upProduct) => {
  try {
    const updatedProduct = upProduct.name
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
