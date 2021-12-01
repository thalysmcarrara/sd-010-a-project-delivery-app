const moment = require('moment');
const { Sale, SaleProduct } = require('../database/models');

const create = async (saleValue, id) => {
  const saleDate = moment().format();
  const sale = await Sale.create({ ...saleValue, saleDate, userId: id, status: 'Pendente' });
  if (!sale) return { status: 500, message: 'Internal Server Error' };
  
  const { products } = saleValue;
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

const getSale = async (id, role) => {
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

module.exports = {
  create,
  getSale,
};
