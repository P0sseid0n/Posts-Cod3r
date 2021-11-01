const { db } = require('./.env')

module.exports = {
	client: 'postgresql',

	connection: {
		database: 'knowledge',
		user: 'postgres',
		password: db.psqlPass,
	},
	pool: {
		min: 2,
		max: 10,
	},
	migrations: {
		tableName: 'knex_migrations',
	},
}
