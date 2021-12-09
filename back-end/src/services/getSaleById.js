const { Sale, SalesProduct, Product, User } = require('../database/models');

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

const getSaleById = async (id) => {    
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
       
       return formatData(params);
};

module.exports = getSaleById;