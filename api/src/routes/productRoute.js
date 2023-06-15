const { Router } = require("express");
const {
  postCreateProduct,
  getProducts,
  getProductById,
  putProduct,
} = require("./middleware/productFunct");
const productRoute = Router();

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

productRoute.get("/", async (req, res) => {
  let { name } = req.query;
  try {
    const product = await getProducts(name);
    res.status(200).send(product);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error: Lista de productos no encontrada");
  }
});

productRoute.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productById = await getProductById(id);
    res.status(200).send(productById);
  } catch (error) {
    res.status(400).send(`Error al buscar usuario con id: ${id}`);
  }
});
productRoute.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status, name, image, description, price, type, category } = req.body;
  const upProduct = {
    name,
    image,
    description,
    price,
    type,
    category,
  };
  try {
    const updatedProduct = await putProduct(status, id, upProduct);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error al actualizar el producto" });
  }
});

app.put('/productos/:producto_id/activar', (req, res) => {
  const productoId = parseInt(req.params.producto_id);

  const producto = productos.find(p => p.id === productoId);
  if (producto) {
    producto.activo = true; // Se establece el campo "activo" en true para activar el producto
    res.json({ mensaje: 'Producto activado correctamente' });
  } else {
    res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
});

// Ruta PUT para desactivar un producto por su ID
app.put('/productos/:producto_id/desactivar', (req, res) => {
  const productoId = parseInt(req.params.producto_id);

  const producto = productos.find(p => p.id === productoId);
  if (producto) {
    producto.activo = false; // Se establece el campo "activo" en false para desactivar el producto
    res.json({ mensaje: 'Producto desactivado correctamente' });
  } else {
    res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});

  

module.exports = productRoute;
