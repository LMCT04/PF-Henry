const { Router } = require("express");
const userRoute = Router();
const {
    getUser,
    postUser,
    updateUserInDatabase,
} = require("./middleware/userFunct");

userRoute.get("/", async (req, res) => {
    const { mail, fullName } = req.query;

    try {
        const user = await getUser(mail, fullName);
        res.status(200).send(user);
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        res.status(500).send("Error al obtener el usuario");
    }
});

userRoute.post("/", async (req, res) => {
    const {
        fullName,
        userName,
        image,
        mail,
        password,
        age,
        address,
        favorite,
        shoppingHistory,
        role,
    } = req.body;
    try {
        await postUser(
            fullName,
            userName,
            image,
            mail,
            password,
            age,
            address,
            favorite,
            shoppingHistory,
            role
        );
        res.status(200).send({ message: "Usuario creado con éxito" });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            res.status(400).send({ error: "El usuario ya existe" });
            alert("el usuario ya existe");
        } else {
            res.status(500).send({ error: "Error al crear el usuario" });
        }
    }
});

userRoute.put("/", async (req, res) => {
    const { mail, password, userName } = req.body;
    try {
        await updateUserInDatabase(mail, password, userName);
        res.status(200).send({ message: "Usuario actualizado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error al actualizar el usuario" });
    }
});

module.exports = userRoute;
