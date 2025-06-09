const express = require('express');
const router = express.Router();
const { getAllProducts, loadMockProducts } =require('../controller/productController');

router.get('/render', getAllProducts);
router.post('/load', loadMockProducts); // for testing only

module.exports = router;