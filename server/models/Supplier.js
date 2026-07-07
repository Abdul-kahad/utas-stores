const mongoose = require('mongoose');

const supplierSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  address: {
    street: { 
      type: String, 
      trim: true 
    },
    city: { 
      type: String, 
      required: true,
      trim: true
    },
    region: { 
      type: String, 
      required: true,
      enum: [
        'Greater Accra', 'Ashanti', 'Western', 'Northern', 'Central', 
        'Eastern', 'Volta', 'Bono', 'Upper East', 'Upper West',
        'Savannah', 'Bono East', 'Ahafo', 'Western North', 'Oti', 'North East'
      ]
    }
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Supplier', supplierSchema);