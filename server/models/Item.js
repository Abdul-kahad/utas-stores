const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  category: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 0,
    required: true
  },
  unit: {
    type: String,
    default: 'Pcs',
    required: true
  },
  reorderLevel: {
    type: Number,
      default: 10
  },

},{
  timestamps: true
})

module.exports = mongoose.model('Item', itemSchema)