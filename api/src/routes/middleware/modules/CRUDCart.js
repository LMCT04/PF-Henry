const { Product, ShoppingCart } = require("../../../database.js");

//Adiocionar al carrrito
const moduleaPostaddTocart = async (userId, productId, quantity) => {
  try {
    const cart = await ShoppingCart.findOne({ where: { userId } });
    if (!cart) await ShoppingCart.create({ userId });
    await cart.addProduct(productId, { through: { quantity } });
    const totalprice = await calculateCartTotalPrice(cart);
    await cart.update({ totalprice });
    return { message: "Product agregado correctamente" };
  } catch (error) {
    console.error(error);
    throw new Error("Error al agregar el producto al carrito");
  }
};

//Eliminar un prodyucto del carito

const moduleRemoveOneProductFromCart = async (userId, productId) => {
  try {
    const cart = await ShoppingCart.findOne({ where: { userId } });
    if (!cart) throw new Error("Carrito no encontrado");
    await cart.removeProduct(productId);
    const totalprice = await calculateCartTotalPrice(cart);
    await cart.update({ totalprice });
    return { message: "Product eliminado correctamente" };
  } catch (error) {
    console.error(error);
    throw new Error("Error al eliminar el producto del carrito");
  }
};

// Obtener el contenido del carrito
const moduleGetCartContent = async (userId) => {
  try {
    const cart = await ShoppingCart.findOne({
      where: { userId },
      include: {
        model: Product,
      },
    });

    if (!cart) {
      throw new Error("Carrito no encontrado");
    }
    return { cart };
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener el contenido del carrito");
  }
};

// Actualizar la cantidad de un producto en el carrito
const moduleUpdateCartItemQuantity = async (userId, productId, quantity) => {
  try {
    const cart = await ShoppingCart.findOne({ where: { userId, productId } });
    if (!cart) throw new Error("Carrito no encontrado");
    await cart.products.update({ quantity }, { where: { id: "productId" } });
    const totalPrice = await calculateCartTotalPrice(cart);
    await cart.update({ totalPrice });
    return message(
      "Cantidad de producto en el carrito actualizada correctamente"
    );
  } catch (error) {
    nsole.error(error);
    throw new Error(
      "Error al actualizar la cantidad del producto en el carrito"
    );
  }
};

const modluleRemoveAllProductsFromCart = async (userId) => {
  try {
    const cart = await ShoppingCart.findOne({ where: { userId } });
    if (!cart) throw new Error("Carrito no encontrado");
    await cart.setProducts([]);
    await cart.update({ totalPrice: 0 });
    return { message: "Todos los productos del carrito han sido borrados" };
  } catch (error) {
    console.error(error);
    throw new Error(`Error al eliminar todos los productos del carrito`);
  }
};

const calculateCartTotalPrice = async (cart) => {
  const products = await cart.getProducts();
  let totalPrice = 0;
  products.forEach((product) => {
    totalPrice += product.price * product.cartProduct.quantity;
  });
  return totalPrice;
};
module.exports = {
  moduleaPostaddTocart,
  moduleRemoveOneProductFromCart,
  moduleGetCartContent,
  moduleUpdateCartItemQuantity,
  modluleRemoveAllProductsFromCart,
};
