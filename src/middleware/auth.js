const jwt = require('jsonwebtoken');
const config = process.env;

function verifyToken(req, res, next) {
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

module.exports = verifyToken;