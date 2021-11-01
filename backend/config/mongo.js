const { db } = require('../.env')
const mongoose = require('mongoose')
mongoose.connect(db.mongoUrl, { useNewUrlParser: true }).then(() => {
	console.log('Mongo Conectado')
})
