const requestRoutes = require('express').Router()
const { sendRequest, userRequests, getRequest, approveRequest, rejectRequest, fulfillRequest, directIssueItem} = require('../controllers/requestController')
const { downloadRequestPDF } = require('../controllers/requestReportController')
const { authenticate, authorize } = require('../middleware/authMiddleware')

requestRoutes.post('/api/requests', authenticate, authorize(["admin", "department_user"]), sendRequest)
requestRoutes.get('/api/requests/user', authenticate, authorize(["admin", "department_user"]), userRequests)
requestRoutes.get('/api/requests', authenticate, authorize(["admin", "store_manager", "procurement", "department_user"]), getRequest)
requestRoutes.put('/api/requests/:id/approve', authenticate, authorize(["admin", "store_manager"]), approveRequest)
requestRoutes.put('/api/requests/:id/reject', authenticate, authorize(["admin", "store_manager"]), rejectRequest)
requestRoutes.put('/api/requests/:id/fulfill', authenticate, authorize(["admin", "store_manager"]), fulfillRequest)
requestRoutes.get('/api/requests/download/:id', authenticate, downloadRequestPDF)
requestRoutes.post('/api/requests/direct-issue', authenticate, authorize(["admin", "store_manager"]), directIssueItem)

module.exports = requestRoutes