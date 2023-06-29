const { Category } = require("../../../database.js")

const moduleGetAllCategoryFromDataBase = async () => {
    try {
        const categories = await Category.findAll();
        return categories

    } catch (error) {
        console.log(`Error en getAllCategoryFromDataBase ${error}`);
        throw new Error("Error al obtener las categorias");
    }
};

module.exports = {
    moduleGetAllCategoryFromDataBase
}
