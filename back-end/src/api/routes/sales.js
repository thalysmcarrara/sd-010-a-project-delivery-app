const express = require('express');

const router = express.Router();

const saleController = require('../../controllers/saleController');
const { validateToken } = require('../../middlewares/validateToken');

router.post('/', validateToken, saleController.createSale);
router.get('/:id', validateToken, saleController.getSaleById);
router.get('/', validateToken, saleController.getSales);

module.exports = router;
