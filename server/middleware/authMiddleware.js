const JWT = require('jsonwebtoken')
const User = require('../models/User')

const authenticate = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {  
    try {
      const accessToken = req.headers.authorization?.split(' ')[1]
      if(!accessToken) return res.status(401).json({message: 'Expierd or No token'})
      const decoded = JWT.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET)
      const validUser = await User.findById(decoded.id).select('-password')
      if(!validUser) return res.status(403).json({message: 'Invalid user or token'})
      req.user = decoded
      next()
    } catch (error) {
      console.error("Authorization Middleware Caught an Error:", error.message);
      return res.status(401).json({ 
          message: 'Access token expired or invalid.', 
          errorType: error.name 
      });
    }
}
}

const authorize = (roles = []) => {
  if(typeof roles === 'string'){
     roles = [roles]
  }
    return (req, res, next) => {
      try{
          if (!req.user.role) {
          return res.status(401).json({ message: 'Authentication required' });
        }

        if(roles.length && !roles.includes(req.user.role)){
          return res.status(403).json({message: 'Access denied, invalid permision'})
        }
        next()
        } catch (error) {
        console.log(`An error occured: ${error}`)
        res.status(500).json({message: 'Invalid permision'})
      }
    }
}

module.exports = {
  authenticate,
  authorize
}