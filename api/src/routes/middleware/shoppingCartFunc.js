const {
  moduleaPostaddTocart,
  moduleRemoveOneProductFromCart,
  moduleGetCartContent,
  moduleUpdateCartItemQuantity,
  modluleRemoveAllProductsFromCart,
} = require("./modules/CRUDCart");

const postAddToCart = async (userId, productId, quantity) => {
  try {
    return moduleaPostaddTocart(userId, productId, quantity);
  } catch (error) {
    throw new Error(
      `Error al agregar el producto al carrito: ${error.message}`
    );
  }
};

const postRemoveOneProductFromCart = async (userId, productId) => {
  try {
    return await moduleRemoveOneProductFromCart(userId, productId);
  } catch (error) {
    throw new Error(
      `Error al eliminar el producto del carrito: ${error.message}`
    );
  }
};

const getCartContent = async (userId) => {
  try {
    return await moduleGetCartContent(userId);
  } catch (error) {
    throw new Error(
      `Error al obtener el contenido del carrito: ${error.message}`
    );
  }
};

const postUpdateCartItemQuantity = async (userId, productId, quantity) => {
  try {
    return moduleUpdateCartItemQuantity(userId, productId, quantity);
  } catch (error) {
    throw new Error(
      `Error al actualizar la cantidad del producto en el carrito: ${error.message}`
    );
  }
};

const postRemoveAllProductsFromCart = async (userId) => {
  try {
    return modluleRemoveAllProductsFromCart(userId);
  } catch (error) {
    throw new Error(
      `Error al actualizar al limpiar el carrito: ${error.message}`
    );
  }
};

module.exports = {
  postAddToCart,
  postRemoveOneProductFromCart,
  getCartContent,
  postUpdateCartItemQuantity,
  postRemoveAllProductsFromCart,
};
