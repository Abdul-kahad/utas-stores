const itemRoutes = require('express').Router() 
const {getItems, getItem, addItem, updateItem, deleteItem} = require('../controllers/itemController')
const {authenticate, authorize} = require('../middleware/authMiddleware')

itemRoutes.get('/api/items', authenticate, authorize(["admin", "store_manager", "department_user", "procurement"]), getItems)
itemRoutes.get('/api/items/:id', authenticate, authorize(["admin", "store_manager", "department_user", "procurement"]), getItem)
itemRoutes.post('/api/items', authenticate, authorize(["admin", "procurement"]), addItem)
itemRoutes.put('/api/items/:id', authenticate, authorize(["admin", "procurement"]), updateItem)
itemRoutes.delete('/api/items/:id', authenticate, authorize(["admin", "procurement"]), deleteItem)

module.exports = itemRoutes