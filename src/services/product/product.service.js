const { execute } = require('../../database/mysql.connector.js');
const queries = require('./product.queries.js');

const findAll = async() => {
	return execute(queries.findAll, []);
}

const findOne = async(params) => {
	const result = await execute(queries.findOne, [
		params.code,
		params.productId,
	]);

	return result[0];
}

const findByUser = async(id) => {
	return execute(queries.findByUser, [ id ]);
}

const insert = async(product) => {
	const result = await execute(queries.insert, [
		product.userId,
		product.code,
		product.name,
		product.price,
		product.category,
		product.description
	]);

	return result.affectedRows > 0;
}

module.exports = {
	findAll,
	findOne,
	findByUser,
	insert
};