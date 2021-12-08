const { Sale, SalesProduct, Product } = require('../../database/models');
const takeToken = require('../../services/takeToken');

const getSaleById = async (req, res) => {
  const { authorization } = req.headers;

  const payload = takeToken(authorization);

  const id = payload.id;

  const rawResults = await Sale.findOne({ 
    where: { user_id: id },
    include: [{ model: Product, as: 'products' }],
  });

  console.log(rawResults);
  // const modeled = {
  //   ...rawResults,
  //   products: rawResults.SalesProducts.map((product) => ({
  //     name: product.Products.name,
  //     price: product.Products.price,
  //     quantity: product.quantity,
  //   })),
  // };
  // delete modeled.SalesProducts;
  res.status(200).json(rawResults);
};

module.exports = getSaleById;
