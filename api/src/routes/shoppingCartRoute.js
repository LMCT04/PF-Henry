const { Router } = require("express");
const {
  postAddToCart,
  postRemoveOneProductFromCart,
  getCartContent,
  postUpdateCartItemQuantity,
  postRemoveAllProductsFromCart,
} = require("./middleware/shoppingCartFunc");

const cartRouter = Router();

cartRouter.post("/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const result = await postAddToCart(userId, productId, quantity);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Error al agregar el producto al carrito" });
  }
});

cartRouter.post("/remove", async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const result = await postRemoveOneProductFromCart(userId, productId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .send({ error: "Error al eleiminar el producto del carrito" });
  }
});

cartRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await getCartContent(userId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .send({ error: "Error al obtener el contenido del carrito" });
  }
});

cartRouter.post("/update", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const result = await postUpdateCartItemQuantity(
      userId,
      productId,
      quantity
    );
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(400).send({
      error: "Error al actualizar la cantidad del producto del carrito",
    });
  }
});

cartRouter.post("/clear", async (req, res) => {
  const { userId } = req.body;
  try {
    const result = await postRemoveAllProductsFromCart(userId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Error al limpiar el carrito" });
  }
});

module.exports = cartRouter;
