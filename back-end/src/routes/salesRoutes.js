const express = require('express');
const rescue = require('express-rescue');

const { createSale } = require('../controllers/Sales');
const { getAllSalesById, getSaleById } = require('../controllers/Sales');

const router = express.Router();

router
  .post('/', rescue(createSale))
  .get('/orders', rescue(getAllSalesById))
  .get('/ordesProducts', getSaleById);

module.exports = router;