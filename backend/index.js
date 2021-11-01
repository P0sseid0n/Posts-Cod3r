const app = require('express')()
const PORT = process.env.PORT || 3000
const consign = require('consign')
const db = require('./config/db')

const mongoose = require('mongoose')
require('./config/mongo')

app.db = db
app.mongoose = mongoose

consign({ locale: 'pt-BR' })
	.include('./config/passport.js')
	.then('./config/middlewares.js')
	.then('./api/validation.js')
	.then('./api/')
	.then('./schedule')
	.then('./config/routes.js')
	.into(app)

app.listen(PORT, () => console.log(`Backend na porta ${PORT}`))
