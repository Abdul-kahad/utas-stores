const requestRoutes = require('express').Router()
const { sendRequest, userRequests, getRequest, approveRequest, rejectRequest, fulfillRequest} = require('../controllers/requestController')
const { authenticate, authorize } = require('../middleware/authMiddleware')

requestRoutes.post('/api/requests', authenticate, authorize(["admin", "department_user"]), sendRequest)
requestRoutes.get('/api/requests/user', authenticate, authorize(["admin", "department_user"]), userRequests)
requestRoutes.get('/api/requests', authenticate, authorize(["admin", "store_manager"]), getRequest)
requestRoutes.put('/api/requests/:id/approve', authenticate, authorize(["admin", "store_manager"]), approveRequest)
requestRoutes.put('/api/requests/:id/reject', authenticate, authorize(["admin", "store_manager"]), rejectRequest)
requestRoutes.put('/api/requests/:id/fulfill', authenticate, authorize(["admin", "store_manager"]), fulfillRequest)

module.exports = requestRoutes