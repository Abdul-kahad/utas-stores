const authRoutes = require('express').Router()
const {register, login, refresh, logout} = require('../controllers/authController')
const { authenticate, authorize } = require('../middleware/authMiddleware')

authRoutes.post('/api/auth/register', authenticate, authorize(['admin']), register)
authRoutes.post('/api/auth/login', login)
authRoutes.post('/api/auth/refresh', refresh)
authRoutes.post('/api/auth/logout', authenticate, logout)

module.exports = authRoutes