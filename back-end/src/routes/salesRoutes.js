const express = require('express');
const rescue = require('express-rescue');

const { createSale } = require('../controllers/Sales');

const router = express.Router();

router
  .post('/', rescue(createSale));

module.exports = router;