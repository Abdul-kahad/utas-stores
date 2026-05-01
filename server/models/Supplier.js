const mongoose = require('mongoose')

const supplierSchema = mongoose.Schema({
  name:{
    type: String,
    required: true,
    index: true
  },
  contact:{
    type: String,
    required: true,
  },
  address:{
    type: String,
    required: true,
  }
},
{
  timestamps: true
})

module.exports = mongoose.model('Supplier', supplierSchema)