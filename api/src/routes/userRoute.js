const { Router } = require("express");
const userRoute = Router();
const { getUser, postUser } = require("./middleware/userFunct");

userRoute.get("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    const user = await getUser(id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(400).send({ message: "Usuario no encontrado" });
    }
  } catch {
    console.error(error);
    res.status(400).send({ message: "Error al obtener el usuario" });
  }
});

userRoute.post("/", async (req, res) => {
  const {
    name,
    lastName,
    image,
    mail,
    password,
    age,
    address,
    favorite,
    shoppingHistory,
  } = req.body;
  try {
    await postUser(
      name,
      lastName,
      image,
      mail,
      password,
      age,
      address,
      favorite,
      shoppingHistory
    );
    res.status(200).send({ message: "Usuario creado con exito" });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).send({ error: "El usuario ya existe" });
    } else {
      res.status(500).send({ error: "Error al crear el usuario" });
    }
  }
});

module.exports = userRoute;
