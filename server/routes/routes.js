const route = require('express').Router()
const {register, login, refresh, logout} = require('../controllers/authController')
const {authenticate, authorize} = require('../middleware/authMiddleware')

route.post('/register', register)
route.post('/login', login)
route.get('/refresh', refresh)
route.post('/logout', logout)

module.exports = route