const {Schema} = require('../connect.js')

const NoteTypeSchema = new Schema({
  tag: {
    type: String,
    require: true,
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

module.exports = NoteTypeSchema