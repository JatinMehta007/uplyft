const express = require('express');
const router = express.Router();
const { getAllProducts, loadMockProducts } = require('../controllers/productController');

router.get('/', getAllProducts);
router.post('/load', loadMockProducts); // for testing only

module.exports = router;