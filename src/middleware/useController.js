const useController = (fn) => (req, res, next) =>
	Promise.resolve(fn(req, res, next)).catch(error => {
		console.log('Error:', JSON.stringify(error));
		res.status(error.status || 500).json({
			message: error.message || 'Ocurrió un error interno.'
		});
	});

module.exports = useController;