const { Router } = require("express");
const { postCreateProduct } = require("./middleware/productFunct");
const productRoute = Router();

// productRoute.get("/", async (req, res) => {
//   try {
//     //aca redireccionar al middleware que trabajara con esta ruta, por ejemplo:
//     //const product = await getAllProduct()
//   } catch (error) {}
// });

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

module.exports = productRoute;
