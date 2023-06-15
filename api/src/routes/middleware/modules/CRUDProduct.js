const { User, Product } = require("../../../database.js"),
  { Op } = require("sequelize");
//definir las funciones que hacen toda la logica para traer todos los usuarios, por nombre o por id.
//En CRUDProduct se definen todas las peticiones Create (Crear), Read (Leer), Update (Actualizar) y Delete (Borrar)

//definir funciones

const modulePostProduct = async (newProduct) => {
  try {
    const product = await Product.create(newProduct);
    return product;
  } catch (error) {
    console.error(error);
    throw new Error("Error al crear producto");
  }
};

const moduleGetAllProductFromDatabase = async () => {
  try {
    const products = await Product.findAll();

    // const formateProducts = products.map((product) => {
    //   return {
    //     id: product.id,
    //     name: product.name,
    //     image: product.image,
    //     description: product.description,
    //     price: product.price,
    //     type: product.type,
    //     category: product.category,
    //   };
    // });

    return products;
  } catch (error) {
    console.log(error);
  }
};

const moduleGetProductFromDatabaseByName = async (name) => {
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
const moduleGetProductById = async (id) => {
  try {
    const productById = await Product.findOne({
      where: { id: id },
    });

    return productById;
  } catch (error) {
    console.error(error);
  }
};

const modulePutStatusProduct = async (id, status) => {
  try {
    const product = await Product.findByPk(id);
    product.isActive = status;
    await product.save();
    return product;
  } catch (error) {
    console.error(error);
  }
};

const modulePutUpdateProduct = async (id, upProduct) => {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error("Producto no encontrado");
    }

    product.name = upProduct.name;
    product.image = upProduct.image;
    product.description = upProduct.description;
    product.price = upProduct.price;
    product.type = upProduct.type;
    product.category = upProduct.category;

    await product.save();

    return product;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  //exportar cada funcion
  modulePostProduct,
  moduleGetProductFromDatabaseByName,
  moduleGetAllProductFromDatabase,
  moduleGetProductById,
  modulePutStatusProduct,
  modulePutUpdateProduct,
};
