const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userService = require('../services/auth/auth.service.js');

/*
 *		POST /auth/register
 *
 *		@body:
 *
 *		email: {string}
 *		password: {string}
 *		role: {string}
 */

const signUp = async(req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const role = req.body.role;

	if(!email || !password) {
		throw { status: 404, message: 'Debes proveer un usuario y una contraseña.' };
	}

	let isRegistered = await userService.findOne(email);

	if(isRegistered) {
		throw { status: 409, message: 'Este usuario ya existe.' };
	}

	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);

	const user = {
		email,
		password: hash,
		role
	}
	
	await userService.insert(user);

	const token = jwt.sign(
		{
			email,
			role,
		},
		process.env.TOKEN_KEY,
		{
			expiresIn: '1h',
		}
	);

	res.status(201).json({
		email,
		token,
		role
	});
}

/*
 *		POST /auth/register
 *
 *		@body:
 *
 *		email: {string}
 *		password: {string}
 *		role: {string}
 */

const signIn = async(req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	if(!email || !password) {
		throw { status: 400, message: 'Debes proveer un usuario y una contraseña.' };
	}

	const user = await userService.findOne(email);
	
	if(!user) {
		throw { status: 404, message: 'Este usuario no existe.' };
	}

	if(!bcrypt.compareSync(password, user.password)) {
		throw { status: 400, message: 'La contraseña es incorrecta.' };
	}
	
	const token = jwt.sign(
		{
			email,
			role: user.role
		},
		process.env.TOKEN_KEY,
		{
			expiresIn: '1h',
		},
	);

	res.status(200).json({
		email,
		token,
		role: user.role
	});
}

module.exports = {
	signUp,
	signIn
};