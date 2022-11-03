const { execute } = require('../../database/mysql.connector.js');

const queries = require('./auth.queries.js');

const findOne = async(email) => {
	const result = await execute(queries.findOne, [ email ]);

	return result[0];
}

const insert = async(user) => {
	const result = await execute(queries.insert, [
		user.email,
		user.password,
		user.role
	]);

	return result.affectedRows > 0;
}

module.exports = {
	findOne,
	insert
}