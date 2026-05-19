const supplierRoutes = require('express').Router()
const { createSupplier, deleteSupplier, getAllSuppliers, getSupplierById, updateSupplier } = require('../controllers/supplierController.js')
const { authenticate, authorize } = require('../middleware/authMiddleware')

supplierRoutes.get('/api/suppliers', authenticate, authorize(['admin', 'procurement']), getAllSuppliers)
supplierRoutes.get('/api/suppliers/:id', authenticate, authorize(['admin', 'procurement']), getSupplierById)
supplierRoutes.post('/api/suppliers', authenticate, authorize(['admin', 'procurement']), createSupplier)
supplierRoutes.put('/api/suppliers/:id', authenticate, authorize(['admin', 'procurement']), updateSupplier)
supplierRoutes.delete('/api/suppliers/:id', authenticate, authorize(['admin', 'procurement']), deleteSupplier)

module.exports = supplierRoutes