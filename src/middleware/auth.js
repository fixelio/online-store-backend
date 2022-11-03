const jwt = require('jsonwebtoken');
const config = process.env;

const verifyToken = (req, res, next) => {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];

	if(!token) {
		return res.status(403).json({ mensaje: 'Un token es requerido para la autenticación.' });
	}

	try {
		const decoded = jwt.verify(token, config.TOKEN_KEY);
		req.user = decoded;
	}
	catch(error) {
		res.status(401).json({ mensaje: 'Token inválido.' });
	}

	return next();
}

const verifyUser = role => (req, res, next) => {
	const user = req.user;

	if(role !== user.role) {
		return res.status(403).send('No tienes permisos para acceder a esta página');
	}

	next();
}

module.exports = {
	verifyToken,
	verifyUser
};