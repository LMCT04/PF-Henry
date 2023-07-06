const { User } = require("../../../database.js");
const { Op } = require("sequelize");

const modelgetUserFromDatabase = async (mail) => {
    try {
        const user = await User.findAll({
            where: { mail: mail },
        });

        if (user.length === 0) {
            throw new Error("Usuario no encontrado");
        }

        return {
            id: user[0].id,
            image: user[0].image,
            fullName: user[0].fullName,
            userName: user[0].userName,
            mail: user[0].mail,
            age: user[0].age,
            address: user[0].address,
            favorite: user[0].favorite,
            shoppingHistory: user[0].shoppingHistory,
            role: user[0].role,
        };
    } catch (error) {
        console.error(error);
        throw new Error("Error al obtener el usuario");
    }
};

const modelgetAllUserFromDatabase = async () => {
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        console.log(`Error en getAllUsersFromDatabase ${error}`);
        throw new Error("Error al obtener los usuarios");
    }
};

const modelgetAllUserFromDatabasebyName = async (fullName) => {
    try {
        const users = await User.findAll({
            where: {
                fullName: {[Op.iLike]: `%${fullName}%`}
            }
        });
        return users;
    } catch (error) {
        console.error(`Error en modelgetAllUserFromDatabasebyName: ${error}`);
        throw new Error("Error al obtener los usuarios por nombre");
    }
};

const modelpostUserInDatabase = async (
    fullName,
    userName,
    image,
    mail,
    password,
    age,
    address,
    favorite,
    shoppingHistory,
    role
) => {
    if (!["admin", "user", "superAdmin"].includes(role)) {
        throw new Error("El valor de 'role' no es válido");
    }
    let [newUser, created] = await User.findOrCreate({
        where: {
            mail: mail,
        },
        defaults: {
            fullName,
            userName,
            image,
            mail,
            password,
            age,
            address,
            favorite,
            shoppingHistory,
            role,
        },
    });
    if (!created) {
        throw new Error("El usuario ya existe");
    }
    return newUser;
};

const modelupdatePasswordInDatabase = async (mail, newPassword) => {
    try {
        const user = await User.findOne({ where: { mail: mail } });

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        user.password = newPassword;
        await user.save();

        return {
            id: user.id,
            image: user.image,
            fullName: user.fullName,
            userName: user.userName,
            mail: user.mail,
            age: user.age,
            address: user.address,
            favorite: user.favorite,
            shoppingHistory: user.shoppingHistory,
            role: user.role,
        };
    } catch (error) {
        console.error(error);
        throw new Error("Error al actualizar la contraseña");
    }
};

const modelUpdateRole = async (mail, rol) => {
    try{
        const user = await User.findOne({where: {mail:mail}})

        user.role = rol
        await user.save()

        return {
            id: user.id,
            image: user.image,
            fullName: user.fullName,
            userName: user.userName,
            mail: user.mail,
            age: user.age,
            address: user.address,
            favorite: user.favorite,
            shoppingHistory: user.shoppingHistory,
            role: user.role,
        }
    } catch (error) {
        console.error(error);
        throw new Error("Error al actualizar el rol de usuario");
    }
}

const modelupdateUsernameInDatabase = async (mail, newUsername) => {
    try {
        const user = await User.findOne({ where: { mail: mail } });

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        user.userName = newUsername;
        await user.save();

        return {
            id: user.id,
            image: user.image,
            fullName: user.fullName,
            userName: user.userName,
            mail: user.mail,
            age: user.age,
            address: user.address,
            favorite: user.favorite,
            shoppingHistory: user.shoppingHistory,
            role: user.role,
        };
    } catch (error) {
        console.error(error);
        throw new Error("Error al actualizar el nombre de usuario");
    }
};

module.exports = {
    modelgetUserFromDatabase,
    modelpostUserInDatabase,
    modelgetAllUserFromDatabase,
    modelupdatePasswordInDatabase,
    modelupdateUsernameInDatabase,
    modelgetAllUserFromDatabasebyName,
    modelUpdateRole
};
