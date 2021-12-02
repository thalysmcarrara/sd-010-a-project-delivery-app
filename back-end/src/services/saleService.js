const moment = require('moment');
const camelCase = require('camelcase');
const { Sale, SaleProduct, User, Product } = require('../database/models');

const create = async (saleValue, id) => {
  const { products, ...rest } = saleValue;

  const sale = await Sale.create({ ...rest, userId: id });
  if (!sale) return { status: 500, message: 'Internal Server Error' };
  
  const saleId = sale.dataValues.id;

  const allProducts = products.map(async (product) => {    
    const createSaleProduct = await SaleProduct.create({
      saleId,
      productId: product.productId,
      quantity: product.quantity,
    });
    if (!createSaleProduct) return { status: 500, message: 'Sale not created' };
  });

  await Promise.all(allProducts);

  return { status: 201, saleId };
};

const getSales = async (id, role) => {
  let sales;

  if (role === 'seller') {
    sales = await Sale.findAll({ where: { SELLER_ID: id } });
    if (!sales) return { status: 404, message: 'Sale not found' };
    return { status: 200, sales };
  }

  sales = await Sale.findAll({ where: { USER_ID: id } });
  if (!sales) return { status: 404, message: 'Sale not found' };
  return { status: 200, sales };
};

const getSaleById = async (id) => {
  const response = await Sale.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: User, as: 'seller', attributes: { exclude: ['password'] } },      
      {
        model: Product,
        as: 'products',
        through: { attributes: ['quantity'] },
      },
    ],
  });
  const sale = response.toJSON();
  const object = {};
  Object.keys(sale).forEach((key) => {
    object[camelCase(key)] = sale[key];
  });
  object.saleDate = moment(object.saleDate).format('DD/MM/YYYY');
  return object;
};

const updateSale = async (id, data) => {
  await Sale.update(data, { where: { id } });

  const updated = await getSaleById(id);
  return updated;
};

module.exports = {
  create,
  getSales,
  getSaleById,
  updateSale,
};
