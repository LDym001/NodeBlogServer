const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/blog')

module.exports = {Schema,model} = mongoose