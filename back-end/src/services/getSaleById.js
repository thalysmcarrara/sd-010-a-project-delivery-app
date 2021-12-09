const { Sale, SalesProduct } = require('../database/models');

const getSaleById = async (id) => {
    const testString = 'saleId';
    const test = await SalesProduct.findAll();
    console.log(test);
    const rawResults = await Sale.findOne({ 
         where: { id },         
          include: [{ model: SalesProduct }] });   
    console.log(await rawResults);
    const modeled = { ...rawResults,
        products: rawResults.SalesProducts.map((product) => ({
                name: product.Products.name,
                price: product.Products.price,
                quantity: product.quantity,
            })),
        };
    delete modeled.SalesProducts;
    return modeled;        
};

module.exports = getSaleById;