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
    SalesProduct.belongsTo(models.Sale, {
      foreignKey: 'saleId',      
    });
    SalesProduct.belongsTo(models.Product, {
      foreignKey: 'productId',      
    });
  };

  return SalesProduct;
};
