const { Router } = require("express");
const userRoute = Router();

userRoute.post("/", async (req, res) => {
  try {
    //aca redireccionar al middleware que trabajara con esta ruta, por ejemplo:
    //const product = await postCreateUser()
  } catch (error) {}
});

module.exports = userRoute;
