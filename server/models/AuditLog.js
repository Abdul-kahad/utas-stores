const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },

  action: {
    type: String,
    required: true,
    enum: [
      'USER_LOGGEDIN',
      'USER_REGISTERD',
      'USER_LOGGEDOUT',
      'ITEM_CREATED', 
      'ITEM_UPDATED', 
      'ITEM_DELETED', 
      'CATALOG_EXCEL_IMPORT',
      'RECEIPT_CREATED',
      'RECEIPT_DOWNLOADED',
      'DIRECT_ISSUED',
      'REQUEST_SENT',
      'REQUEST_APPROVED',
      'REQUEST_REJECTED',
      'REQUEST_FULFILLED',
      'SUPPLIER_CREATED',
      'SUPPLIER_UPDATED',
      'SUPPLIER_DELETED',
      'USER_UPDATED',
      'USER_DELETED',
      'STOCK_ADJUSTMENT'
    ]
  },

  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  targetModel: {
    type: String,
    required: false,
    enum: ['Item', 'User','Receipt','Request','Supplier']
  },

  details: {
    type: mongoose.Schema.Types.Mixed, 
    default: {}
  },

  ipAddress: {
    type: String,
    required: false
  },

  timestamp: {
    type: Date,
    default: Date.now
  }
});

AuditLogSchema.index({ timestamp: -1 });
AuditLogSchema.index({ action: 1 });
AuditLogSchema.index({ userId: 1 });

module.exports = mongoose.model('AuditLog', AuditLogSchema);