//destructurar todas las funciones de los modelos aca
const {
  moduleGetProductFromDatabaseByName,
  moduleGetAllProductFromDatabase,
  modulePostProduct,
  moduleGetProductById,
  modulePutStatusProduct,
  modulePutUpdateProduct,
  modulePostAddFavorite,
  moduleGetFavorite,
  modulePostAddRating,
  moduleGetRating,
  modulePutRating,
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

const addFavorites = async (productId, userId) => {
  try {
    const favorites = await modulePostAddFavorite(productId, userId);
    return favorites;
  } catch (error) {
    console.error(error);
  }
};

const getFavorite = async (userId) => {
  try {
    const favorite = await moduleGetFavorite(userId);
    return favorite;
  } catch (error) {
    console.error(error);
  }
};

const addRating = async (productId, userId, ratingValue) => {
  try {
    const rating = await modulePutRating(productId, userId, ratingValue);
    return rating;
  } catch (error) {
    console.error(error);
    throw new Error("Error al agregar rating");
  }
};
const getRating = async () => {
  return await moduleGetRating();
};
module.exports = {
  //exportar cada funcion
  getProducts,
  postCreateProduct,
  getProductById,
  putProduct,
  addFavorites,
  getFavorite,
  addRating,
  getRating,
};
