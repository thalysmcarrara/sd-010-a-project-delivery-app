const { takeToken } = require('../../services');
const { Product, User, SalesProduct, Sale } = require('../../database/models');

const findProd = async (idProd, quantity) => {
  const product = await Product.findOne({
    where: { id: idProd },
  });

  const { name } = product;

  return { name, quantity, price: product.price, total: quantity * product.price };
};

function formatData(data) {
  return {
    id: data.id,
    sellerName: data.name,
    saleDate: data.saleDate,
    status: data.status,
    totalPrice: data.totalPrice,
    products: data.products,
  };
}

const getAllSales = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;

  const payload = takeToken(authorization);
  if (!payload) return res.status(400).json({ message: 'Token inválido' });
  
  const sales = await Sale.findOne({
   where: { id },
  });
  
  const { sellerId } = sales;
  const seller = await User.findOne({
    where: { id: sellerId },
   });
  const prods = await SalesProduct.findAll({ where: { saleId: id } });

  const products = await Promise.all(prods.map((pr) => findProd(pr.productId, pr.quantity)));

  const { saleDate, status, totalPrice } = sales;

  const params = { id, name: seller.name, saleDate, status, totalPrice, products };

  return res.status(200).json(formatData(params));
};

module.exports = getAllSales;
