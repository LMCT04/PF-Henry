const { Router } = require("express");
const userRoute = Router();
const { User } = require("../database");
userRoute.get("/",async(req,res)=>{
  try {
    let users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
});

userRoute.post("/", async (req, res) => {
    try {  
      // Insertar un nuevo registro
      const newUser = await User.create({
        image: "https://example.com/imagen.jpg",
        name: "John",
        lastName: "Doe",
        mail: "johndoe@example.com",
        password: "secretpassword",
        age: 25,
        address: "123 Main St",
        favorite: [1, 2, 3],
        shoppingHistory: [4, 5, 6],
      });
      res.status(200).send("Nuevo usuario insertado:", newUser);
    } catch (error) {
      console.error("Error al insertar usuario:", error);
    }
  
});

module.exports = userRoute;
