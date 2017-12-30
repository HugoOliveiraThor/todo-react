const mongoose = require('mongoose')
// Usar a promise do Moongose 
mongoose.Promise = global.Promise
module.exports = mongoose.connect('mongodb://localhost/todo')