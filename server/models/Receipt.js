const mongoose = require("mongoose")

const receiptSchema = mongoose.Schema({
  supplier: {
    type: mongoose.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },

  item: {
    type: mongoose.Types.ObjectId,
    ref: 'Item',
    required: true
  },

  quantityReceived: {
    type: Number,
    required: true
  },

  receivedBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category:{
    type: String,
    required: true
  },
  unit:{
    type: String,
    required: true
  }

}, {
  timestamps: true
})

module.exports = mongoose.model('Receipt', receiptSchema)