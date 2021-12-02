module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    "Sale",
    {
      userId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      totalPrice: DataTypes.STRING,
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW(),
      },
      status: {
        type: DataTypes.STRING(50),
        defaultValue: 'Pendente',
      },
    },
    {
      timestamps: false,
      tableName: "sales",
      underscored: true,
    }
  );

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
    Sale.belongsTo(models.User, {
      foreignKey: "seller_id",
      as: "seller",
    });
  };

  return Sale;
};
