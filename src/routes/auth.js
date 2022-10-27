const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/auth.js');

const router = express.Router();
const users = [];

router.post('/auth/register', function(req, res) {
	const email = req.body.email;
	const password = req.body.password;

	if(!email || !password) {
		res.status(400).json({ mensaje: 'Debes proveer un usuario y una contraseña.' });
		return;
	}

	let user = users.filter(user => user.email === email)[0];

	if(user) {
		res.status(409).json({ mensaje: 'Este usuario ya existe.' });
		return;
	}

	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);

	user = {
		email,
		password: hash,
	}
	
	users.push(user);

	const token = jwt.sign(
		{
			username: email
		},
		process.env.TOKEN_KEY,
		{
			expiresIn: '1h',
		}
	);

	res.status(201).json(token);
});



router.post('/auth/login', function(req, res) {
	const email = req.body.email;
	const password = req.body.password;

	if(!email || !password) {
		res.status(400).json({ mensaje: 'Debes proveer un usuario y una contraseña.' });
		return;
	}

	let user = users.filter(user => user.email === email)[0];
	if(!user) {
		res.status(400).json({ mensaje: 'Este usuario no existe.' });
		return;
	}

	if(!bcrypt.compareSync(password, user.password)) {
		res.status(400).json({ mensaje: 'La contraseña es incorrecta.' });
		return;
	}
	
	const token = jwt.sign(
		{
			username: email
		},
		process.env.TOKEN_KEY,
		{
			expiresIn: '1h',
		},
	);

	res.status(200).json(token);
});


router.get('/welcome', verifyToken, function(req, res) {
	res.status(200).send("Aún estamos trabajando en esta página");
})


module.exports = router;