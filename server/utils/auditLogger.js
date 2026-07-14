const AuditLog = require('../models/AuditLog');
const logger = require('../middleware/logger');

const logBusinessAction = async ({ userId, userEmail, action, targetId, targetModel, details, req }) => {
  try {
    const ipAddress = req ? (req.headers['x-forwarded-for'] || req.socket.remoteAddress) : 'System';

    const auditEntry = new AuditLog({
      userId,
      userEmail,
      action,
      targetId,
      targetModel,
      details,
      ipAddress
    });

    await auditEntry.save();
    
    logger.info(`[AUDIT] ${userEmail} performed ${action} on ${targetModel || 'System'}`);
  } catch (err) {
    logger.error(`CRITICAL: Failed to write to Audit Log database. Error: ${err.message}`);
  }
};

module.exports = { logBusinessAction };