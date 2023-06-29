const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const productRoute = require("./productRoute");
const userRoute = require("./userRoute");
const categoryRoute = require("./categoryRoute");
const cartRoute = require("./shoppingCartRoute");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/user", userRoute);
router.use("/product", productRoute);
router.use("/category", categoryRoute);
router.use("/cart"), cartRoute;

module.exports = router;
