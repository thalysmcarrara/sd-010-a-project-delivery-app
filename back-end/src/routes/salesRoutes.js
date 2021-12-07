const express = require('express');
const rescue = require('express-rescue');

const { createSale } = require('../controllers/Sales');
const { getAllSalesById } = require('../controllers/Sales');

const router = express.Router();

router
  .post('/', rescue(createSale))
  .get('/orders', rescue(getAllSalesById));

module.exports = router;