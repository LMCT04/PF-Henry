const { Router } = require("express");
const productRoute = Router();
const { getAllProducts } = require("./middleware/productFunct");

productRoute.get("/", async (req, res) => {
  let { name } = req.query;
  try {
    const product = await getAllProducts(name);
    res.status(200).send(product);

    //aca redireccionar al middleware que trabajara con esta ruta, por ejemplo:
    //const product = await getAllProduct()
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Producto no encontrado" });
  }
});

module.exports = productRoute;
