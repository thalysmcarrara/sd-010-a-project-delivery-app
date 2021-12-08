const express = require('express');
const rescue = require('express-rescue');

const { createSale } = require('../controllers/Sales');
const { getAllSalesById } = require('../controllers/Sales');
const { getAllSales } = require('../controllers/Sales');

const router = express.Router();

router
  .post('/', rescue(createSale))
  .get('/orders', rescue(getAllSalesById))
  .get('/:id', rescue(getAllSales));

module.exports = router;