const { insert, takeToken } = require('../../services'); 
const moment = require('moment');

const createSale = async (req, res) => {
  console.log('controller');
  const date = moment().locale('pt-br').format('DD/MM/YYYY');

  // const { authentication } = req.headers;
  const dataSale = req.body;
  // console.log(dataSale);
  // const { id } = takeToken(authentication);
  // if (!id) return res.status(400).json('Bad request');
  const sale = await insert('sales', { ...dataSale, status: 'Pendente', saleDate: date });
  
  return res.status(201).json(sale);
};

module.exports = createSale;