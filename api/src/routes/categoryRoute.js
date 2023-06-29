const { Router } = require("express");
const categoryRoute = Router();
const { Category } = require("../database.js");
const { getCategories } = require ('./middleware/categoryFunct.js')

categoryRoute.post("/create", async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await Category.create({ name });
    res.status(200).send(newCategory);
  } catch (error) {
    res.status(400).send(`Error al crear categoria ${name}${error}`);
  }
});

categoryRoute.get("/", async (req, res) => {
  try {
    const categories = await getCategories()
    res.status(200).send(categories)
  } catch (error) {
    res.status(400).send("Error: Lista de categorias no encontrada")
  }
})

module.exports = categoryRoute;
