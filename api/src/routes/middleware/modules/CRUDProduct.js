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

    return products;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener todos los productos");
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
    throw new Error(`No se encontro el producto ${name}`);
  }
};

const moduleGetProductById = async (id) => {
  if (isNaN(id)) {
    throw new Error(`El id: ${id} no es válido`);
  }

  const totalProducts = await Product.count();

  if (id > totalProducts) {
    throw new Error(`El id: ${id} no es válido`);
  }
  try {
    const productById = await Product.findByPk(id);
    return productById;
  } catch (error) {
    console.error(error);
    throw new Error(`El id: ${id} no es valido`);
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
    Product.findByPk(id)
      .then((product) => {
        if (product) {
          product.name = upProduct.name;
          product.image = upProduct.image;
          product.description = upProduct.description;
          product.price = upProduct.price;
          product.type = upProduct.type;
          product.category = upProduct.category;
          product.isActive = true;

          return product.save(); // Guarda los cambios en la base de datos
        } else {
          throw new Error("Producto no encontrado");
        }
      })
      .then((updatedProduct) => {
        console.log("Producto actualizado:", updatedProduct);
      })
      .catch((error) => {
        console.error("Error al actualizar el producto:", error);
      });
  } catch (error) {
    console.error(error);
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
