const moment = require('moment');
const { Sale, SaleProduct } = require('../database/models');


const create = async (order, id) => {
  const date = moment().format('MM/DD/YYYY HH:mm:ss');
  const sale = await Sale.create({ ...order, sale_date: date, user_id: id, status: 'Pendente' });
  if (!sale) return { status: 500, message: 'Internal Server Error' };

  console.log(sale);
  
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
  return { saleId: sale.dataValues.id, status: 201, sale };
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
