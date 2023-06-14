const { User, Product } = require("../../../database.js"),
  { Op } = require("sequelize");
//definir las funciones que hacen toda la logica para traer todos los usuarios, por nombre o por id.
//En CRUDProduct se definen todas las peticiones Create (Crear), Read (Leer), Update (Actualizar) y Delete (Borrar)

//definir funciones

const getAllProductFromDatabase = async () => {
  try {
    const products = await Product.findAll();
    const formateProducts = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        image: product.image,
        description: product.description,
        price: product.price,
        type: product.type,
        category: product.category,
      };
    });
    return formateProducts;
  } catch (error) {}
};

const getProductFromDatabaseByName = async (name) => {
  try {
    const products = await Product.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
    });
    const formateProducts = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        image: product.image,
        description: product.description,
        price: product.price,
        type: product.type,
        category: product.category,
      };
    });
    return formateProducts;
  } catch (error) {
    console.error(error);
  }
};

const GetProductId=async(productId)=>{
  try {
    const product = await Product.findByPk(productId);
    return product;
  } catch (error) {
    throw new Error("Error al obtener el producto por ID");
  }
}

module.exports = {
  getProductFromDatabaseByName,
  getAllProductFromDatabase,
  GetProductId
};
