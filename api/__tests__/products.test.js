const {
  modulePostProduct,
  moduleGetProductFromDatabaseByName,
  moduleGetAllProductFromDatabase,
  moduleGetProductById,
  modulePutStatusProduct,
  modulePutUpdateProduct,
} = require("../src/routes/middleware/modules/CRUDProduct");
const { Product } = require("../src/database.js");

jest.setTimeout(60000);

xdescribe("postProduct", () => {
  it("crea un producto exitosamente", async () => {
    const newProduct = {
      name: "Test product",
      image:
        "https://spoonacular.com/recipeImages/715497-312x231.jpgwalmart.com",
      description: "test description",
      price: 0.99,
      type: "liquido",
      category: "sin Tacc",
    };
    const createdProduct = await modulePostProduct(newProduct);
    expect(createdProduct.name).toEqual(newProduct.name);
    expect(createdProduct.description).toEqual(newProduct.description);
    expect(createdProduct.price).toEqual(newProduct.price);
    expect(createdProduct.category).toEqual(newProduct.category);
    expect(createdProduct.image).toEqual(newProduct.image);
  });

  it("Input invalido", async () => {
    const newProduct = {
      name: 123, // Valor no válido para name, se espera una cadena de texto
      image: "invalid-url", // Valor no válido para image, se espera una URL válida
      description: "", // Valor no válido para description, se espera una cadena no vacía
      price: -1, // Valor no válido para price, se espera un número mayor o igual a cero
      type: 123, // Valor no válido para type, se espera una cadena de texto
      category: null, // Valor no válido para category, se espera una cadena de texto
    };
    await expect(modulePostProduct(newProduct)).rejects.toThrow(
      "Error al crear producto"
    );
  });
  // Tests that the function can handle a large number of products
  it("Crea muchos productos sin errores", async () => {
    const newProduct = {
      name: "Test product",
      image:
        "https://spoonacular.com/recipeImages/715497-312x231.jpgwalmart.com",
      description: "test description",
      price: 10.99,
      type: "liquido",
      category: "sin Tacc",
    };
    const promises = [];
    for (let i = 0; i < 50; i++) {
      promises.push(modulePostProduct(newProduct));
    }
    const createdProducts = await Promise.all(promises);
    expect(createdProducts.length).toBe(50);
    //Se probo hasta con 1000 productos, aunque tarda 56s en ejecutarse.
  });
  it("Error al omitir campo", async () => {
    const newProduct = {
      name: "",
      image:
        "https://spoonacular.com/recipeImages/715497-312x231.jpgwalmart.com",
      description: "test description",
      price: 10.99,
      type: "liquido",
      category: "sin Tacc",
    };
    await expect(modulePostProduct(newProduct)).rejects.toThrow(
      "Error al crear producto"
    );
  });
  //Agregar test para verificar seguridad, para que solo el admin pueda crear productos.
});

describe("getProducts", () => {
  it("Trae todos los productos", async () => {
    const mockProducts = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ];
    const findAllMock = jest
      .spyOn(Product, "findAll")
      .mockResolvedValue(mockProducts);

    const result = await moduleGetAllProductFromDatabase();

    expect(findAllMock).toHaveBeenCalled();
    expect(result).toEqual(mockProducts);

    findAllMock.mockRestore();
  });
  it("Si la DB esta vacia devuelve un array vacio", async () => {
    const mockProducts = [];
    const findAllMock = jest
      .spyOn(Product, "findAll")
      .mockResolvedValue(mockProducts);

    const result = await moduleGetAllProductFromDatabase();

    expect(findAllMock).toHaveBeenCalled();
    expect(result).toEqual(mockProducts);

    findAllMock.mockRestore();
  });

  it("Error si la conexion a la DB falla", async () => {
    jest
      .spyOn(Product, "findAll")
      .mockRejectedValue(new Error("Database connection failed"));
    await expect(moduleGetAllProductFromDatabase()).rejects.toThrow(
      "Error al obtener productos de la base de datos"
    );
  });

  it("Retorna un array de objetos", async () => {
    const products = [{ name: "Product 1" }, { name: "Product 2" }];
    jest.spyOn(Product, "findAll").mockResolvedValue(products);
    const result = await moduleGetAllProductFromDatabase();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(products.length);
    expect(result[0].name).toBe(products[0].name);
    expect(result[1].name).toBe(products[1].name);
  });

  it("Arroja error si no puede devolver los productos", async () => {
    jest
      .spyOn(Product, "findAll")
      .mockRejectedValue(new Error("Database connection failed"));
    await expect(moduleGetAllProductFromDatabase()).rejects.toThrow(
      "Error al obtener productos de la base de datos"
    );
  });
  //productsByName
  it("test_happy_path_valid_product_name", async () => {
    const products = await moduleGetProductFromDatabaseByName("Pan");
    expect(products).toEqual(expect.any(Array));
    expect(products.length).toBeGreaterThan(0);
  });
});
