const receiptRoutes = require('express').Router() 
const  { generateReceipt, getReceipts }  = require('../controllers/receiptController')
const {authenticate, authorize} = require('../middleware/authMiddleware')

receiptRoutes.post('/api/receipts/create', authenticate, authorize(["admin", "procurement"]), generateReceipt)
receiptRoutes.get('/api/receipts', authenticate, authorize(["admin", "procurement"]), getReceipts);

module.exports = receiptRoutes