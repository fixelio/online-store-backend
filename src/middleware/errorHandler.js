const handleError = (error, req, res, next) => {
	console.log('Error:', JSON.stringify(error));

	res
		.status(error.status || 500)
		.send(error.message || 'Ocurrió un error interno.');
}

module.exports = handleError;