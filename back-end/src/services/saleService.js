const moment = require('moment');
const camelCase = require('camelcase');
const { Sale, SaleProduct, User, Product } = require('../database/models');

const create = async (order, id) => {
  const date = moment().format();
  const sale = await Sale.create({
    ...order,
    sale_date: date,
    user_id: id,
    status: 'Pendente',
  });
  if (!sale) return { status: 500, message: 'Internal Server Error' };

  const { products } = order;
  const saleId = sale.dataValues.id;

  products.forEach(async (product) => {
    const createSaleProduct = await SaleProduct.create({
      sale_id: saleId,
      product_id: product.productId,
      quantity: product.quantity,
    });
    if (!createSaleProduct) return { status: 500, message: 'Sale not created' };
  });
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
      {
        model: Product,
        as: 'products',
        through: { attributes: ['quantity'] },
      },
    ],
    // raw: true,
    // nest: true,
  });
  const sale = response.toJSON();
  const object = {};
  Object.keys(sale).forEach((key) => {
    object[camelCase(key)] = sale[key];
  });
  object.saleDate = moment(object.saleDate).format('DD/MM/YYYY');
  return object;
};

module.exports = {
  create,
  getSales,
  getSaleById,
};
