const itemRoutes = require('express').Router() 
const {authenticate, authorize} = require('../middleware/authMiddleware')
const {getItems, getItem, addItem, updateItem, deleteItem} = require('../controllers/itemController')
const { importExcelInventory } = require('../controllers/excelImportController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

itemRoutes.get('/api/items', authenticate, authorize(["admin", "store_manager", "department_user", "procurement"]), getItems)
itemRoutes.get('/api/items/:id', authenticate, authorize(["admin", "store_manager", "department_user", "procurement"]), getItem)
itemRoutes.post('/api/items', authenticate, authorize(["admin", "procurement"]), addItem)
// itemRoutes.put('/api/items/:id', authenticate, authorize(["admin", "procurement"]), updateItem)
itemRoutes.delete('/api/items/:id', authenticate, authorize(["admin", "procurement"]), deleteItem)

itemRoutes.post('/api/items/import-excel', authenticate, authorize(["admin", "procurement"]), upload.single('file'), importExcelInventory);

module.exports = itemRoutes