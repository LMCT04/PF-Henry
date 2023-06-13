const { Router } = require("express");
const productRoute = Router();

productRoute.get("/", async (req, res) => {
  try {
    //aca redireccionar al middleware que trabajara con esta ruta, por ejemplo:
    //const product = await getAllProduct()
  } catch (error) {}
});

module.exports = productRoute;
