const { insert, takeToken } = require('../../services');

const createSale = async (req, res) => {
  const { authentication } = req.headers;
  const dataSale = req.body;
  const { id } = takeToken(authentication);
  if(id) return res.status()
  const sale = await insert('sales', dataSale);
  
  res.status(201).json(sale);
};

module.exports = createSale;