const { Router } = require("express");
const {
  postCreateProduct,
  getProducts,
  getProductById,
  putProduct,
} = require("./middleware/productFunct");
const productRoute = Router();

productRoute.post("/createProduct", async (req, res) => {
  const { name, image, description, price, type, category, userId } = req.body;
  const newProduct = {
    name,
    image,
    description,
    price,
    type,
    category,
    userId,
  };
  try {
    const product = await postCreateProduct(newProduct);
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send("Error al crear receta");
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
    res.status(400).send(`Error al buscar usuario con id: ${id}`);
  }
});
productRoute.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status, name, image, description, price, type, category } = req.body;
  const upProduct = {
    name,
    image,
    description,
    price,
    type,
    category,
  };
  try {
    const updatedProduct = await putProduct(status, id, upProduct);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error al actualizar el producto" });
  }
});

module.exports = productRoute;
