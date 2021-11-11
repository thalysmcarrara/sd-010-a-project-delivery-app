module.exports =  (sequelize, DataTypes) => {
  const Product = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4,2),
    url_image: DataTypes.STRING,

  },
  {
    timestamps: false, // remove a obrigatoriedade de utilizar os campos `createdAt` e `updatedAt`
    tableName: 'Users',
  });

  Product.associate = (models) => {
    Product.hasMany(models.SaleProduct,
      { foreignKey: 'product_id', as: 'sales' });
  };

  return Product;
};