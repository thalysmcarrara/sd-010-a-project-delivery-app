const { find, takeToken } = require('../../services');
const { Product, User, SalesProduct, Sale } = require('../../database/models');

const getAllSales = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  // console.log('id', id);
  console.log('getsales');
  const payload = takeToken(authorization);
  if(!payload) return res.status(400).json({ message: 'Token inválido'});
  // console.log('payload:::', payload);
  // const { id } = payload;
  // const sales = await find('salesProducts', 
  //     { saleId: id },
  //     { attributes: { exclude: ['sellerId']}},
  // );
  const sales = await Sale.findOne({
   where: { id },
  });
  // console.log('sales:::', sales);
  // const salesFiltered = payload.role === 'customer'
  //   ? sales.filter((sale) => sale.userId === payload.id)
  //   : sales.filter((sale) => sale.sellerId === payload.id);
  const { sellerId } = sales;
  const seller = await User.findOne({
    where: { id: sellerId },
   });
  //  console.log('seller:::', seller.name);

  const prods = await SalesProduct.findAll({
    where: { saleId: id }
  });
  const findProd = async (idProd, quantity) => {
    const product = await Product.findOne({
      where: { id: idProd },
    });
    console.log('produuuuuuuuuu', product);
    const name = product.name;

     // console.log(ppp.name);
    return { name, quantity, price: product.price, total: quantity * product.price }
  };

  const products = await Promise.all(prods.map((pr) => 
    findProd(pr.productId, pr.quantity)
  ));

  // console.log('Prod:::', products);

  const retornoDetalhe = {
    id,
    'sellerName': seller.name,
    'saleDate': sales.saleDate,
    'status': sales.status,
    'totalPrice': sales.totalPrice,
    products,
  };

  return res.status(200).json(retornoDetalhe);
};

module.exports = getAllSales;
