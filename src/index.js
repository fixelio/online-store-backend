require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');

const app = express();
const port = '5001';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(function(req, res, next) {
	app.options('*', cors());
	next();
});

app.use('/api', authRoutes);


app.listen(port, function() {
	console.log(`Server started on port ${port}. Press CTRL-C to exit`);
});