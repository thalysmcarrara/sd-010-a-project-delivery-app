module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define(
    "SaleProduct",
    {
      quantity: DataTypes.INTEGER,
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      saleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'salesProducts'
    }
  );

  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: "products",
      foreignKey: "sale_id",
      otherKey: "product_id",
      through: SaleProduct,
    });

    models.Product.belongsToMany(models.Sale, {
      as: "sales",
      foreignKey: "product_id",
      otherKey: "sale_id",
      through: SaleProduct,
    });
  };

  return SaleProduct;
};
