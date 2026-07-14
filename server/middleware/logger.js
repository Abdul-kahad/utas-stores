const winston = require('winston');
require('winston-mongodb');
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    
    new winston.transports.MongoDB({
      level: 'warn', // Only save 'warn' and 'error' logs (ignores routine http requests)
      db: process.env.MONGO_URI, 
      options: {
        useUnifiedTopology: true
      },
      collection: 'system_logs', // Collection name
      capped: true, // 👈 CRITICAL: Prevents your database from filling up
      cappedSize: 10000000, // Max size in bytes (10MB)
      cappedMax: 5000, // Max number of log documents to keep
      decolorize: true // Remove color codes before saving to JSON
    })
  ]
});

module.exports = logger;