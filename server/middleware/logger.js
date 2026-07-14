const winston = require('winston');
const mongoose = require('mongoose');
require('winston-mongodb');

const mongoConnectionPromise = new Promise((resolve) => {
  if (mongoose.connection.readyState === 1) {
    resolve(mongoose.connection.getClient());
  } else {
    mongoose.connection.once('open', () => {
      resolve(mongoose.connection.getClient());
    });
  }
});

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
      level: 'info',               
      db: mongoConnectionPromise,  
      collection: 'system_logs',  
      
      capped: true,                
      cappedSize: 10000000,       
      cappedMax: 5000,             
      decolorize: true,           
      
      options: {
        useUnifiedTopology: true   
      },
      metaKey: 'meta'              
    })
  ]
});

module.exports = logger;