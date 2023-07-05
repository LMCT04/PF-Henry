const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "rating",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
    },
    {
      timestamps: true,
    }
  );
};
