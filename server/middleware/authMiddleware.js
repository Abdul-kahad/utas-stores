const JWT = require('jsonwebtoken')
const User = require('../models/User')

const authenticate = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1]
    if(!accessToken) return res.status(401).json({message: 'Expierd or No token'})
    const verifyToken = JWT.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET)
    const userId = verifyToken.id
    const validUser = await User.findById(userId).select('-password')
    if(!validUser) return res.status(403).json({message: 'Invalid user or token'})
    req.userRole = verifyToken.role
    next()
  } catch (error) {
    console.log(`An error occured: ${error}`)
    res.status(500).json({message: 'Expierd or invalid token'})
  }
}

const authorize = (roles = []) => {
  if(typeof roles === 'string'){
     roles = [roles]
  }
    return (req, res, next) => {
      try{
          if (!req.userRole) {
          return res.status(401).json({ message: 'Authentication required' });
        }

        if(roles.length && !roles.includes(req.userRole)){
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