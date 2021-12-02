const router = require('express').Router();

const userRoutes = require('./userRoutes');
const sellerRoutes = require('./sellerRoutes');
const productRoutes = require('./productRoutes');
const salesRoutes = require('./salesRoutes');

router
  .use('/products', productRoutes)
  .use('/seller', sellerRoutes)
  .use('/user', userRoutes)
  .use('/sales', salesRoutes);

module.exports = router;
