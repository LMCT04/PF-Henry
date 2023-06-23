const { Router } = require("express");
const userRoute = Router();
const { getUser, postUser } = require("./middleware/userFunct");

userRoute.get("/", async (req, res) => {
  let { mail } = req.body;
  try {
    const user = await getUser(mail);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener el usuario");
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
    //role
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
      shoppingHistory,
      //role
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
