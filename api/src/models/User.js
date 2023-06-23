const { DataTypes, UUIDV4 } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          isUrl: {
            msg: "La imagen debe de ser una URL valida",
          },
        },
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            arg: [3],
            msg: "El campo debe tener al menos 3 caracteres",
          },
        },
      },

      mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: "El email es incorrecto",
          },
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8, 16],
          },
        },
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      favorite: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      shoppingHistory: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM("admin", "user", "superAdmin"),
        defaultValue: "user",
        field: "role",
      },
    },
    {
      timestamps: false,
    }
  );
};
