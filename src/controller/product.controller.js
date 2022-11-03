const crypto = require('crypto');
const productService = require('../services/product/product.service.js');
const userService = require('../services/auth/auth.service.js');

/*
 *		GET /product
 *
 *		@query code: {string}
 *
 */

const getProduct = async(req, res) => {
	const code = req.query.code;

	res.status(200).json();
}

/*
 *		GET /products
 *
 */

const getAllProducts = async(req, res) => {
	const user = await userService.findOne(req.user.email);

	const productsByUserRole = {
		'seller': productService.findByUser,
		'customer': productService.findAll
	};

	const handler = productsByUserRole[user.role];
	const products = await handler(user.userId);

	res.status(200).json(products);
}

/*
 *		POST /product
 *
 *		@body:
 *
 *		name: {string}
 * 	price: {number}
 * 	category: {string}
 *		description: {string}
 */

const insertProduct = async(req, res) => {
	const name = req.body.name;
	const price = Number(req.body.price.split(',').join('.'));
	const category = req.body.category;
	const description = req.body.description;
	const code = crypto.randomBytes(8).toString('hex');

	const user = await userService.findOne(req.user.email);
	if(!user) {
		throw { status: 500, message: 'El usuario no existe.' };
	}

	await productService.insert({
		userId: user.userId,
		code,
		name,
		price,
		category,
		description,
	});

	res.status(201).json({
		message: 'Insertado.'
	});
}

module.exports = {
	getAllProducts,
	insertProduct
}