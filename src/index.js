require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler.js');

const app = express();
const port = '5001';

const mysqlConnector = require('./database/mysql.connector.js');

mysqlConnector.init();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(function(req, res, next) {
	app.options('*', cors());
	next();
});

app.use(errorHandler);

app.use('/api/v1/auth', require('./routes/auth.route.js'));
app.use('/api/v1', require('./routes/product.route.js'));

app.listen(port, function() {
	console.log(`Info: Servidor iniciado en el puerto ${port}.`);
});