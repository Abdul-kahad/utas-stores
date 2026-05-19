const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name:{
    type: String,
    required: true,
    index: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
    select: false
  },
  role:{
    type: String,
    default: "department_user",
    enum: ["admin", "store_manager", "department_user", "procurement"]
  }
  
},{
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)