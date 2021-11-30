const saleService = require('../services/saleService');

const createSale = async (req, res) => {
  const { id } = req.user;
  const {
    seller_id: sellerId,
    delivery_address: deliveryAddress,
    delivery_number: deliveryNumber,
    user_id: userId,
    total_price: totalPrice,
    products,
  } = req.body;
  const saleValues = {
    sellerId, deliveryAddress, deliveryNumber, userId, totalPrice, products,
  };

  const { status, message, saleId } = await saleService.create(saleValues, id);
  if (!saleId) return res.status(status).json({ message });
  console.log('SALEID:', saleId);
  return res.status(201).json({ saleId });
};

const getSaleById = async (req, res) => {
  const { id, role } = req.user;
  
  const { status, message, sales } = await saleService.getSale(id, role);
  if (!sales) return res.status(status).json({ message });
  return res.status(status).json(sales);
};

module.exports = {
  createSale,
  getSaleById,
};
