const { moduleGetAllCategoryFromDataBase } = require("./modules/CRUDCategory");

const getCategories = async () => {
    try {
        const category = await moduleGetAllCategoryFromDataBase()
        return category;
    } catch (error) {
        throw new Error("Error al obtener las categorias: " + error.message);
    }
};

module.exports = {
    getCategories
}
