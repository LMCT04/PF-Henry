require("dotenv").config();
const { Sequelize, HasOne } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY } = process.env;

const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false,
  native: false,
  ssl:true,
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

//Relacionar modelos
const {
  User,
  Product,
  Category,
  ShoppingCart,
  PuchaseOrder,
  Favorite,
  CartProduct,
  Rating,
} = sequelize.models;

//Relaciones
User.hasMany(Product); //User tiene muchos Productos
//ShoppingCart.belongsTo(User); //ShoppingCart pertenece a User
User.hasOne(ShoppingCart, { foreignKey: "userId" }); //
ShoppingCart.belongsToMany(Product, { through: CartProduct });
Product.belongsToMany(ShoppingCart, { through: CartProduct });
PuchaseOrder.belongsTo(User); //PuchaseOrder pertenece a User
Favorite.belongsTo(User, { foreignKey: "userId" });
Favorite.belongsTo(Product, { foreignKey: "productId" });
Product.belongsToMany(Category, { through: "categoryProducts" }); //Productos tiene muchas categorias y viceversa.
Category.belongsToMany(Product, { through: "categoryProducts" });
ShoppingCart.belongsToMany(Product, { through: "cartProduct" }); //ShoppingCart tiene muchos productos y viceversa.
Product.belongsToMany(ShoppingCart, { through: "cartProduct" });
Product.hasMany(Rating); // Relación de uno a muchos: un producto puede tener varias puntuaciones
User.hasMany(Rating); // Relación de uno a muchos: un usuario puede realizar varias puntuaciones
Rating.belongsTo(Product); // Relación de muchos a uno: una puntuación pertenece a un producto específico
Rating.belongsTo(User); // Relación de muchos a uno: una puntuación pertenece a un usuario específico

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
