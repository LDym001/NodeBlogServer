const {Schema} = require('../connect.js')

const CategorySchema = new Schema({
  tag: {
    type: String,
    require: true
  },
  category: {
    type: String,
    require: true
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

module.exports = CategorySchema