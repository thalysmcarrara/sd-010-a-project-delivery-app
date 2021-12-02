const saleService = require('../services/saleService');

const createSale = async (req, res) => {
  const { id } = req.user;
  const {
    seller_id: sellerId,
    delivery_address: deliveryAddress,
    delivery_number: deliveryNumber,
    total_price: totalPrice,
    products,
  } = req.body;
  const saleValues = {
    sellerId, deliveryAddress, deliveryNumber, totalPrice, products,
  };

  const { status, message, saleId } = await saleService.create(saleValues, id);
  if (!saleId) return res.status(status).json({ message });
  console.log('SALEID:', saleId);
  return res.status(201).json({ saleId });
};

const getSales = async (req, res) => {
  const { id, role } = req.user;
  
  const { status, message, sales } = await saleService.getSales(id, role);
  if (!sales) return res.status(status).json({ message });
  return res.status(status).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const sale = await saleService.getSaleById(id);

  res.status(200).json(sale);
};

const updateSale = async (req, res) => {
  const { id, data } = req.body;
  const sale = await saleService.updateSale(id, data);

  res.status(200).json(sale);
};

module.exports = {
  createSale,
  getSales,
  getSaleById,
  updateSale,
};
