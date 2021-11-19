const saleService = require('../services/saleService');

const create = async (req, res, next) => {
  try {
    const {
      userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status, products,
    } = req.body;

    const newSale = await saleService.create({
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      status,
      products,
    });

    return res.status(201).json({ sale: newSale });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await saleService.findById(id);

    return res.status(200).json(sale);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getAll = async (req, res) => {
  const sale = await saleService.getAll();
  return res.status(200).json(sale);
};

const findByIdSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await saleService.findById(id);

    return res.status(200).json(sale);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  findById,
  getAll,
  findByIdSale,
};