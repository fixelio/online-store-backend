const mysql = require('mysql');

let pool;


const init = () => {
	try {
		pool = mysql.createPool({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE
		});

		console.log('Info: Conectado a la base de datos.');
	}
	catch(error) {
		throw new Error("No se puede iniciar el 'pool' de mysql");
	}
};

const execute = (query, params) => {
	try {
		if(!pool) throw new Error("No se ha iniciado la base de datos.");

		return new Promise((resolve, reject) => {
			pool.query(query, params, (error, results) => {
				if(error) reject(error);
				else resolve(results);
			});
		});
	}
	catch(error) {
		throw new Error('No se puede ejecutar la consulta MySQL');
	}
}

module.exports = {
	init,
	execute
}