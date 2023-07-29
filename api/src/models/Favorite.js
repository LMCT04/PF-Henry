const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "favorite",
    {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
}; 
