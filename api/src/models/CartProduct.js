const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("CartProduct", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });
};
