'use strict';

module.exports = (sequelize, DataTypes) => {
 const SalesProduct = sequelize.define(
   'SalesProduct',
   {
     saleId: {
       type: DataTypes.INTEGER,
       primaryKey: true,
     },
     productId: {
       type: DataTypes.INTEGER,
     },
     quantity: DataTypes.INTEGER,
   }, { timestamps: false, tableName: 'salesProducts', underscored: true });
  // 

  SalesProduct.associate = (models) => {
    models.Product.belongsToMany(models.Sale, {
      as:'sales',
      through: SalesProduct,
      foreignKey: 'saleId',
      otherKey:'productId'
    });
    models.Sale.belongsToMany(models.Product, {
      as:'products',
      through: SalesProduct,
      foreignKey: 'productId',
      otherKey:'saleId'
    });
  };

  return SalesProduct;
};
