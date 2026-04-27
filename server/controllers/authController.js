const User = require('../models/User')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

const register = async (req, res) => {
  const {name, email, password, role} = req.body
  console.log(name, email, password, role)
  if(!name || !email || !password || !role) return res.status(400).json({message: 'please enter all fields'})

  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)

  try {
    const userExist = await User.findOne({email})
    if(userExist) return res.status(403).json({message: 'user already exist'})

    const user = await User.create({name, email, password: hashPassword, role})
    res.status(201).json({message: 'Registerd Successfully',user})
  } catch (error) {
    console.log(`An error occured: ${error}`)
    res.status(500).json({message: 'Internal or Server error'})
  }
}

const login = async (req, res) => {
    const {email, password} = req.body
    console.log(email, password)
  if(!email || !password) return res.status(400).json({message: 'please enter all fields'})

  try {
    const userExist = await User.findOne({email}).select('+password')
    if(!userExist) return res.status(401).json({message: 'No such user is available'})

    const passwordMatch = await bcrypt.compare(password, userExist.password)

    if(!passwordMatch) return res.status(403).json({message: 'Invalid password'})
    
    const accessToken = JWT.sign({id: userExist._id, role: userExist.role}, process.env.JWT_ACCESS_TOKEN_SECRET, {expiresIn: '10m'})
    const refreshToken = JWT.sign({id: userExist._id}, process.env.JWT_REFRESH_TOKEN_SECRET, {expiresIn: '1d'})
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(200).json({
      message: 'Login Successfully',
      accessToken
    })
  } catch (error) {
    console.log(`An error occured: ${error.message}`)
    res.status(500).json({message: 'Internal or Server error'})
  }
}

const refresh = async (req, res) => {
  const cookies = req.cookies
  if(!cookies?.jwt) return res.status(401).json({message: 'Unauthorized'})
  const refreshToken = cookies.jwt
  
  try {
    const verifyToken = JWT.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET)
    const userExist =  await User.findOne({_id: verifyToken.id})
    if(!userExist) return res.status(401).json({message: 'Unauthorized'})
    const accessToken = JWT.sign({id: userExist._id, role: userExist.role}, process.env.JWT_ACCESS_TOKEN_SECRET, {expiresIn: '10m'})
    res.status(200).json({ accessToken })
   } catch (error) {
    console.log(`Error cannot verify token: ${error.message }`)
    res.status(403).json({message: 'Forbidden'})
   }
}

const logout = async (req, res) => {
  res.clearCookie('jwt')
  res.status(200).json({message: 'Logout Successfully'})
}

module.exports = {
  register,
  login,
  refresh,
  logout
}