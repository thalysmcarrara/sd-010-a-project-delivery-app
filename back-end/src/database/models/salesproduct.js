'use strict';

module.exports = (sequelize, DataTypes) => {
 const SalesProduct = sequelize.define(
   'SalesProduct',
   {
     sale_id: {
       type: DataTypes.INTEGER,
     },
     product_id: {
       type: DataTypes.INTEGER,
     },
     quantity: DataTypes.INTEGER,
   }, { timestamps: false, tableName: 'salesProducts' })
  SalesProduct.associate = (models) => {
    models.Product.belongsToMany(models.Sale, { as:'sales', through: SalesProduct, foreignKey: 'product_id', otherKey:'sale_id' });
    models.Sale.belongsToMany(models.Product, { as:'products', through: SalesProduct, foreignKey: 'sale_id', otherKey:'product_id' });
  };

  return SalesProduct;
};
