const { find, takeToken } = require('../../services');

const getAllSalesById = async (req, res) => {
  const { authorization } = req.headers;

  const payload = takeToken(authorization);

  const sales = await find('sales');

  const salesFiltered = payload.role === 'customer'
    ? sales.filter((sale) => sale.userId === payload.id)
    : sales.filter((sale) => sale.sellerId === payload.id);

  return res.status(200).json(salesFiltered);
};

module.exports = getAllSalesById;
