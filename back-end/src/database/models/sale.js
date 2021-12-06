'use strict';

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale',
    {
      userId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      totalPrice: DataTypes.FLOAT,
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleDate: DataTypes.DATE,
      status: DataTypes.STRING, 
    },
    { timestamps: true, createdAt: 'sale_date',  updatedAt: false, tableName: 'sales', underscored: true, },  
  );

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreignKey: 'user_id' });
    Sale.belongsTo(models.User, { foreignKey: 'seller_id' });
    // Sale.hasMany(models.SalesProduct, { foreignKey: 'sale_id' });
  };

  return Sale;
};
