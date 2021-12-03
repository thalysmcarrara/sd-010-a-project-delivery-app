const moment = require('moment');
const { insert } = require('../../services');
// const { insert, takeToken } = require('../../services');

const createSale = async (req, res) => {
  const date = moment().locale('pt-br').format('DD/MM/YYYY');

  const dataSale = req.body;

  const sale = await insert('sales', { ...dataSale, status: 'Pendente', saleDate: date });
  
  const refined = sale.get({ plain: true });
  
  await Promise.all(dataSale.products.map(async (product) => {
    const data = {
      saleId: refined.id,
      productId: product.id,
      quantity: product.quantity,
    };
    return insert('salesProducts', data);
  }));
  
  return res.status(201).json(sale);
};

module.exports = createSale;
