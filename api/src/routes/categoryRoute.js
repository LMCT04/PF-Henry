const { Router } = require("express");
const categoryRoute = Router();
const { Category } = require("../database.js");

categoryRoute.post("/create", async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await Category.create({ name });
    res.status(200).send(newCategory);
  } catch (error) {
    res.status(400).send(`Error al crear categoria ${name}${error}`);
  }
});

module.exports = categoryRoute;
