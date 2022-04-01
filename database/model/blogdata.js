const {Schema} = require('../connect.js')

const BlogDataSchema = new Schema({
  tag: {
    type: String,
    require: true
  },
  category: {
    type: String,
    require: true
  },
  path: {
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

module.exports = BlogDataSchema