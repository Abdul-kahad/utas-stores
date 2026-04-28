const authRoutes = require('express').Router()
const {register, login, refresh, logout} = require('../controllers/authController')
const {authenticate} = require('../middleware/authMiddleware')

authRoutes.post('/api/auth/register', register)
authRoutes.post('/api/auth/login', login)
authRoutes.get('/api/auth/refresh', authenticate, refresh)
authRoutes.post('/api/auth/logout', authenticate, logout)

module.exports = authRoutes