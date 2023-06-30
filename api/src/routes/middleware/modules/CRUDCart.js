const {
  Product,
  ShoppingCart,
  User,
  CartProduct,
} = require("../../../database.js");

//Adiocionar al carrrito
const moduleaPostaddTocart = async (userId, productId, quantity) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("Usuario no encontrado");

    let cart = await user.getShoppingCart();
    if (!cart) {
      cart = await ShoppingCart.create({ userId, quantity: 0 ,totalPrice: 0 });
    }

    // Busca si el producto ya está en el carrito
    const cartProduct = await CartProduct.findOne({
      where: { shoppingCartId: cart.id, productId },
    });

    if (cartProduct) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      cartProduct.quantity += quantity;
      await cartProduct.save();
    } else {
      // Si el producto no está en el carrito, crea un nuevo registro
      await CartProduct.create({
        shoppingCartId: cart.id,
        productId,
        quantity,
      });
    }
    // Actualiza la cantidad total del carrito
    cart.quantity += quantity;
    await cart.save();
    // Actualiza el total del carrito
    const totalPrice = await calculateCartTotalPrice(cart);
    cart.totalPrice = totalPrice;
    await cart.save();
    // Actualiza el total del carrito
    await cart.save();
    return { message: "Product agregado correctamente" };
  } catch (error) {
    console.error(error);
    throw new Error("Error al agregar el producto al carrito");
  }
};

//Eliminar un prodyucto del carito

const moduleRemoveOneProductFromCart = async (userId, productId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) throw new Error("Usuario no encontrado");

    const cart = await user.getShoppingCart();
    if (!cart) throw new Error("Carrito de compras no encontrado");

    // Busca el producto en el carrito
    const cartProduct = await CartProduct.findOne({
      where: { shoppingCartId: cart.id, productId },
    });

    if (cartProduct) {
      if (cartProduct.quantity > 1) {
        // Si la cantidad del producto es mayor que 1, reduce la cantidad en 1
        cartProduct.quantity -= 1;
        await cartProduct.save();
      } else {
        // Si la cantidad del producto es 1, elimina el registro del carrito
        await cartProduct.destroy();
      }

      // Actualiza la cantidad total del carrito
      cart.quantity -= 1;
      await cart.save();

      // Actualiza el total del carrito
      const totalPrice = await calculateCartTotalPrice(cart);
      cart.totalPrice = totalPrice;
      await cart.save();

      return { message: "Producto removido correctamente", totalPrice };
    } else {
      throw new Error("Producto no encontrado en el carrito");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error al remover el producto del carrito");
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
    const cartProduct = product.CartProduct;
    if (cartProduct) {
      const productQuantity = cartProduct.quantity;
      totalPrice += product.price * productQuantity;
    }
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
