const mongoose = require('mongoose')

const requestSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  items: [
    {
      item:{
      type : mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true
    },
      quantity:{
        type: Number,
        required: true
    }
    }
  ],
  status:{
    type: String,
    default: null,
    enum: ["pending", "approved", "rejected", "fulfilled", "issued"]
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  }
},{
  timestamps: true
})

module.exports = mongoose.model('Request', requestSchema)