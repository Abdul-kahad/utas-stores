const userRoutes = require('express').Router()
const {getAllUsers, getUserById, updateUser, deleteUser} = require('../controllers/userController')
const {authenticate, authorize} = require('../middleware/authMiddleware')

userRoutes.get('/api/users', authenticate, authorize(['admin']), getAllUsers)
userRoutes.get('/api/users/:id', authenticate, authorize(['admin']), getUserById)
userRoutes.put('/api/users/:id', authenticate, authorize(['admin']), updateUser)
userRoutes.delete('/api/users/:id', authenticate, authorize(['admin']), deleteUser)

module.exports = userRoutes