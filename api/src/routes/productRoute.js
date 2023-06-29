const { Router } = require("express");
const {
  postCreateProduct,
  getProducts,
  getProductById,
  putProduct,
  addFavorites,
  getFavorite,
} = require("./middleware/productFunct");

const productRoute = Router();

productRoute.post("/createProduct", async (req, res) => {
  const { name, image, description, price, type, userId, categoryId } =
    req.body;

  const newProduct = {
    name,
    image,
    description,
    price,
    type,
    userId,
    categoryId,
  };

  try {
    const product = await postCreateProduct(newProduct);
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send("Error al crear nuevo producto");
  }
});

productRoute.get("/", async (req, res) => {
  let { name } = req.query;
  try {
    const product = await getProducts(name);
    res.status(200).send(product);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error: Lista de productos no encontrada");
  }
});

productRoute.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productById = await getProductById(id);
    res.status(200).send(productById);
  } catch (error) {
    res.status(400).send(`Error al buscar producto con id: ${id}`);
  }
});
productRoute.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status, name, image, description, price, type, categoryId } =
    req.body;
  const upProduct = {
    name,
    image,
    description,
    price,
    type,
    categoryId,
  };

  try {
    const updatedProduct = await putProduct(id, status, upProduct);
    res.status(200).json(`El producto se actualizo correctamente`);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error al actualizar el producto" });
  }
});

productRoute.post("/profile", async (req, res) => {
  const { productId, userId } = req.body;

  try {
    const addFav = await addFavorites(productId, userId);
    res.status(200).send(`El producto se agrego correctamente ${addFav}`);
  } catch (error) {
    res.status(400).send(`Error al agregar el producto`);
  }
});

productRoute.get("/profile/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const favorites = await getFavorite(userId);
    res.status(200).send(favorites);
  } catch (error) {
    res.status(500).send("No hay datos");
  }
});

module.exports = productRoute;
