
const {
    User,
    Product,
    Category,
    Favorite,
    Rating,
  } = require("../../../database.js"),
  { Op } = require("sequelize");

//definir las funciones que hacen toda la logica para traer todos los usuarios, por nombre o por id.
//En CRUDProduct se definen todas las peticiones Create (Crear), Read (Leer), Update (Actualizar) y Delete (Borrar)

//definir funciones

const modulePostProduct = async (newProduct) => {
    try {
        if (!newProduct.name || typeof newProduct.name !== "string") {
            throw new Error("El nombre del producto es incorrecto");
        }
        // if (!newProduct.image || typeof newProduct.image !== "string") {
        //   throw new Error("No se proporciono imagen, o el formato es incorrecto");
        // }
        if (
            !newProduct.description ||
            typeof newProduct.description !== "string"
        ) {
            throw new Error("La descripcion no puede estar vacia");
        }
        if (
            !newProduct.price ||
            newProduct.price < 0 ||
            isNaN(Number(newProduct.price))
        ) {
            throw new Error(
                "No se proporciono precio, o el formato es incorrecto"
            );
        }
        if (!newProduct.type || typeof newProduct.type !== "string") {
            throw new Error("Tipo de producto invalido");
        }
        if (!newProduct.categoryId) {
            throw new Error("Es necesaria una categoria");
        }

        const product = await Product.create(newProduct);
        const categories = await Category.findAll({
            where: {
                id: newProduct.categoryId,
            },
        });
        await product.setCategories(categories);
        return product;
    } catch (error) {
        console.error("Error al crear producto", error);
        throw new Error("Error al crear producto");
    }
};

const moduleGetAllProductFromDatabase = async () => {
    try {
        const products = await Product.findAll({
            include: [
                {
                    model: Category,
                    attributes: ["name"],
                    through: { attributes: [] },
                },
            ],
        });
        const categories = products.map((c) => c.categories.map((c) => c.name));

        const formatedProducts = products.map((product, index) => ({
            id: product.id,
            name: product.name,
            image: product.image,
            description: product.description,
            price: product.price,
            type: product.type,
            categories: categories[index],
            isActive:product.isActive,
        }));

        return formatedProducts;
    } catch (error) {
        console.error(error);
        throw new Error("Error al obtener todos los productos");
    }
};

const moduleGetProductFromDatabaseByName = async (name) => {
    try {
        const products = await Product.findAll({
            include: {
                model: Category,
                attributes: ["name"],
                through: { attributes: [] },
            },
            where: {
                name: { [Op.iLike]: `%${name}%` },
            },
        });

        const categories = products.map((c) => c.categories.map((c) => c.name));

        const formatedProducts = products.map((product, index) => ({
            id: product.id,
            name: product.name,
            image: product.image,
            description: product.description,
            price: product.price,
            type: product.type,
            categories: categories[index],
            isActive:product.isActive,
        }));

        return formatedProducts;
    } catch (error) {
        console.error(error);
        throw new Error(
            "Error al obtener los productos de la base de datos por nombre"
        );
    }
};

const moduleGetProductById = async (id) => {
    if (isNaN(id)) {
        throw new Error(`El id: ${id} no es válido`);
    }
    try {
        const productById = await Product.findOne({
            where: { id: id },
            include: {
                model: Category,
                attributes: ["name"],
                through: { attributes: [] },
            },
        });

        const categories = productById.categories.map((c) => c.name);
        const formatedProduct = {
            id: productById.id,
            name: productById.name,
            image: productById.image,
            description: productById.description,
            price: productById.price,
            type: productById.type,
            categories: categories,
        };
        return formatedProduct;
    } catch (error) {
        console.error(error);
        throw new Error(`El id: ${id} no es valido ${error}`);
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
    const product = await Product.findByPk(id, { include: Category });
    if (!product) {
      throw new Error("Producto no encontrado");
    }

    product.name = upProduct.name;
    product.image = [upProduct.image];
    product.description = upProduct.description;
    product.price = upProduct.price;
    product.type = upProduct.type;

    await product.save();

    // Obtener las categorías asociadas al producto
    const existingCategories = product.categories.map(
      (category) => category.id
    );

    // Obtener las categorías nuevas del array categoryId
    const newCategories = await Category.findAll({
      where: {
        id: upProduct.categoryId.map((categoryId) => parseInt(categoryId)),
      },
    });

    // Eliminar las categorías existentes que no están seleccionadas en la solicitud
    await product.removeCategories(
      existingCategories.filter(
        (categoryId) => !upProduct.categoryId.includes(categoryId)
      )
    );

    // Agregar las nuevas categorías al producto
    await product.addCategories(newCategories);

    return product;
  } catch (error) {
    console.error("Error al modificar el producto", error);
    throw new Error(`Error al modificar el producto `);
  }
};

const moduleGetFavorite = async (userId) => {
    try {
        const favorite = await Favorite.findAll({
            where: { userId },
        });

        if (!favorite) {
            throw new Error("No se encontró el favorito");
        }

        return favorite;
    } catch (error) {
        console.error(error);
        throw new Error("No se pudo obtener el favorito");
    }
};

const modulePostAddFavorite = async (productId, userId) => {
    try {
        let getFav = await Favorite.findOne({
            where: { productId, userId },
        });
        if (!getFav) {
            await Favorite.create({ productId, userId });
            console.log("Se agrego a favoritos");

            return true;
        } else {
            await Favorite.destroy({
                where: { productId, userId },
            });
            console.log("Se elimino el producto de favoritos");
        }
    } catch (error) {
        console.error("Error en la inserción del usuario", error);
        throw new Error(`Error en la inserción del usuario`);
    }
};

const modulePostAddRating = async (productId, userId, ratingValue) => {
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return "El producto no existe";
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return "El usuario no existe";
    }

    // const existingRatings = await Rating.findAll({
    //   where: {
    //     productId: product.id,
    //   },
    // });

    // const totalRatings = existingRatings.length;
    // const sumRatings = existingRatings.reduce(
    //   (sum, rating) => sum + rating.value,
    //   0
    // );

    // const newTotalRatings = totalRatings + 1;
    // const newSumRatings = sumRatings + ratingValue;
    // const averageRating = newSumRatings / newTotalRatings;

    // // Actualizamos el valor del producto con el nuevo promedio de puntuación antes de crear el nuevo rating
    // product.value = averageRating;
    // await product.save();

    const rating = await Rating.create({
      productId: product.id,
      userId: user.id,
      value: ratingValue,
    });

    return rating;
  } catch (error) {
    console.error(error);
    return "Ocurrió un error al agregar la puntuación";
  }
};

const moduleGetRating = async () => {
  try {
    const ratings = await Rating.findAll();
    console.log(ratings);
    if (ratings.length === 0) {
      throw new Error("No se encontraron productos con rating");
    }

    const ratingValues = ratings.map((r) => ({
      value: r.value,
      productId: r.productId,
    }));

    return ratingValues;
  } catch (error) {
    throw new Error("Error al obtener la puntuación de los productos");
  }
};
// {
//   id: 34,
//   value: 3,
//   createdAt: '2023-07-04T20:03:23.019Z',
//   updatedAt: '2023-07-04T21:33:14.933Z',
//   productId: 14,
//   userId: '49bac1ff-eb06-4c14-baaa-af89bc844f4b'
// }

const modulePutRating = async (productId, userId, ratingValue) => {
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    const user = await User.findByPk(userId);
    if (!user) {
      return "El usuario no existe";
    }

    const existingRating = await Rating.findOne({
      where: { productId, userId },
    });

    if (existingRating) {
      existingRating.value = ratingValue;
      await existingRating.save();
      return existingRating;
    } else {
      const newRating = await Rating.create({
        productId: product.id,
        userId: user.id,
        value: ratingValue,
      });
      return newRating;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error al modificar la puntuación");
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
  modulePostAddFavorite,
  moduleGetFavorite,
  modulePostAddRating,
  moduleGetRating,
  modulePutRating,
};
