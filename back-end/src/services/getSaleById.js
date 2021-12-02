const { Sale, SalesProduct, Product } = require('../database/models');

const getSaleById = async (id) => {
    const rawResults = await Sale.findOne({ where: { id } },
         { include: [{ model: SalesProduct, include: [{ model: Product }] }] });
    // const rawResults = await Sale.findOne({ where: { id } }, { include: [{ model: Product, as: 'products' }]});
    console.log(await rawResults);
    // const modeled = { ...rawResults,
    //     products: rawResults.SalesProducts.map((product) => ({
    //             name: product.Products.name,
    //             price: product.Products.price,
    //             quantity: product.quantity,
    //         })),
    //     };
    // delete modeled.SalesProducts;     
    // return modeled;
    return true;
};

module.exports = getSaleById;