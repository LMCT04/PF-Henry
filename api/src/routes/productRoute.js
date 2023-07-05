const { Router } = require("express");
const {
  postCreateProduct,
  getProducts,
  getProductById,
  putProduct,
  addFavorites,
  getFavorite,
  addRating,
  getRating,
} = require("./middleware/productFunct");
const { modulePutRating } = require("./middleware/modules/CRUDProduct");
const productRoute = Router();

const Stripe = require("stripe");
require("dotenv").config()
const { KEY } = process.env

productRoute.post("/pay", async (req, res) => {
  console.log("entre");
  const stripe = new Stripe(KEY);
  const session = await stripe.checkout.sessions.create({
    line_items: [ 
      {
        price_data: {
          product_data: {
            name: `${req.body.name}`,
          },
          currency: "usd",
          unit_amount: parseInt(req.body.price * 100), // Convertir a centavos

        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/menu",
    cancel_url: "http://localhost:3000/menu",
  });


  console.log(session);
  return res.json({ url: session.url });

})

productRoute.post("/payCarrito", async (req, res) => {
  const stripe = new Stripe(KEY);

  const lineItems = req.body.map((product) => {
    return {
      price_data: {
        product_data: {
          name: product.name,
        },
        currency: "usd",
        unit_amount: parseInt(product.price * 100), // Convertir a centavos
      },
      quantity: parseInt(product.cartProducts.quantity * 1),
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/menu",
    cancel_url: "http://localhost:3000/menu",
  });

  console.log(session);
  return res.json({ url: session.url });
});
productRoute.post("/createProduct", async (req, res) => {
  const { name, image, description, price, type, userId, categoryId } =
    req.body;

  const newProduct = {
    name,
    image,
    description,
    price,
    type,
    userId,
    categoryId,
  };

  try {
    const product = await postCreateProduct(newProduct);
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send("Error al crear nuevo producto");
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
    res.status(400).send(`Error al buscar producto con id: ${id}`);
  }
});
productRoute.put("/rating", async (req, res) => {
  const { productId, userId, ratingValue } = req.body;
  console.log(productId, userId, ratingValue);
  try {
    const rating = await modulePutRating(productId, userId, ratingValue);
    res.status(200).send(rating);
  } catch (error) {
    res.status(500).send("Error al establecer rating");
  }
});
productRoute.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status, name, image, description, price, type, categoryId } =
    req.body;
  const upProduct = {
    name,
    image,
    description,
    price,
    type,
    categoryId,
  };

  try {
    const updatedProduct = await putProduct(id, status, upProduct);
    res.status(200).json(`El producto se actualizo correctamente`);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Error al actualizar el producto" });
  }
});

productRoute.post("/profile", async (req, res) => {
  const { productId, userId } = req.body;

  try {
    const addFav = await addFavorites(productId, userId);
    res.status(200).send(`El producto se agrego correctamente ${addFav}`);
  } catch (error) {
    res.status(400).send(`Error al agregar el producto`);
  }
});

productRoute.get("/profile/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const favorites = await getFavorite(userId);
    res.status(200).send(favorites);
  } catch (error) {
    res.status(500).send("No hay datos");
  }
});

// productRoute.get("/rating/:productId", async (req, res) => {
//   const { productId } = req.params;
//   try {
//     const rating = await getRating(productId);
//     res.status(200).send(rating);
//   } catch (error) {
//     res.status(500).send("No hay datos de rating");
//   }
// });
productRoute.get("/rating/all", async (req, res) => {
  try {
    const rating = await getRating();
    res.status(200).send(rating);
  } catch (error) {
    res.status(500).send("No hay datos de rating");
  }
});
module.exports = productRoute;
