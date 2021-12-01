module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: DataTypes.STRING,
      url_image: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      tableName: "products",
    }
  );

  return Product;
};
