const authRoutes = require('express').Router()
const {register, login, refresh, logout} = require('../controllers/authController')

authRoutes.post('/api/auth/register', register)
authRoutes.post('/api/auth/login', login)
authRoutes.post('/api/auth/refresh', refresh)
authRoutes.post('/api/auth/logout', logout)

module.exports = authRoutes