const express = require('express');
const adminRoutes = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const getAuditLogs = require('../controllers/adminController');

adminRoutes.get('/api/admin/audit-logs', authenticate, authorize(["admin"]), getAuditLogs);

module.exports = adminRoutes;