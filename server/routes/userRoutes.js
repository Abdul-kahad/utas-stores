const userRoutes = require('express').Router()
const {getAllUsers, getUserById, updateUser, deleteUser} = require('../controllers/userController')
const {authenticate, authorize} = require('../middleware/authMiddleware')

userRoutes.get('/api/users', authenticate, authorize(['admin',"procurement"]), getAllUsers)
userRoutes.get('/api/users/:id', authenticate, authorize(['admin',"procurement"]), getUserById)
userRoutes.put('/api/users/:id', authenticate, authorize(['admin',"procurement"]), updateUser)
userRoutes.delete('/api/users/:id', authenticate, authorize(['admin',"procurement"]), deleteUser)

module.exports = userRoutes