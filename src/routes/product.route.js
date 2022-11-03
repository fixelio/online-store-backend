const express = require('express');
const {
	getAllProducts,
	insertProduct
} = require('../controller/product.controller.js');

const { verifyToken, verifyUser } = require('../middleware/auth.js');
const use = require('../middleware/useController.js');

const router = express.Router();

//router.get('/product', verifyToken, use(productController.getProduct));

router.get('/products', verifyToken, use(getAllProducts));

router.post('/product', verifyToken, verifyUser('seller'), use(insertProduct));

//router.put('/product', verifyToken, verifyUser('seller'), use(productController.updateProduct));

//router.delete('/product', verifyToken, verifyUser('seller'), use(productController.deleteProduct));

module.exports = router;