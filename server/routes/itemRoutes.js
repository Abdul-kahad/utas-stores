const itemRoutes = require('express').Router() 
const {getItems, getItem, addItem, updateItem, deleteItem} = require('../controllers/itemController')
const {authenticate, authorize} = require('../middleware/authMiddleware')

itemRoutes.get('/api/items', authenticate, authorize(["admin", "store_manager", "department_user", "procurement"]), getItems)
itemRoutes.get('/api/items/:id', authenticate, authorize(["admin", "store_manager"]), getItem)
itemRoutes.post('/api/items', authenticate, authorize(["admin", "store_manager"]), addItem)
itemRoutes.put('/api/items/:id', authenticate, authorize(["admin", "store_manager"]), updateItem)
itemRoutes.delete('/api/items/:id', authenticate, authorize(["admin", "store_manager"]), deleteItem)

module.exports = itemRoutes