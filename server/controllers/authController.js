const User = require('../models/User')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const { logBusinessAction } = require('../utils/auditLogger')
const isProduction = process.env.NODE_ENV === 'production';


const register = async (req, res) => {

  console.log(isProduction)
  const currentUser = req.user
  const { name, email, role, password } = req.body


  if (!name || !email || !role || !password) return res.status(400).json({ message: 'please enter all fields' })

  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)

  try {
    const userExist = await User.findOne({ email })
    if (userExist) return res.status(403).json({ message: 'email already exist' })

    const user = await User.create({ name, email, password: hashPassword, role })
    await logBusinessAction({
      userId: currentUser.id,
      userEmail: currentUser?.email,
      action: 'USER_REGISTERD',
      targetId: user._id,
      targetModel: 'User',
      details: { name: user.name },
      req 
    })
    res.status(201).json({ message: 'Registerd Successfully', user })
  } catch (error) {
    console.log(`An error occured: ${error}`)
    res.status(500).json({ message: 'Internal or Server error' })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ message: 'please enter all fields' })

  try {
    const userExist = await User.findOne({ email }).select('+password')
    if (!userExist) return res.status(401).json({ message: 'Invalid email or password' })

    const passwordMatch = await bcrypt.compare(password, userExist.password)
    if (!passwordMatch) return res.status(403).json({ message: 'Invalid email or password' })
    
    const accessToken = JWT.sign(
      { id: userExist._id, role: userExist.role, email: userExist.email, name: userExist.name }, 
      process.env.JWT_ACCESS_TOKEN_SECRET, 
      { expiresIn: '10m' }
    )
    const refreshToken = JWT.sign(
      { id: userExist._id }, 
      process.env.JWT_REFRESH_TOKEN_SECRET, 
      { expiresIn: '1d' }
    )

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    await logBusinessAction({
      userId: userExist._id,
      userEmail: userExist.email,
      action: 'USER_LOGGEDIN',
      targetId: userExist._id,
      targetModel: 'User',
      details: { name: userExist.name },
      req 
    })

    res.status(200).json({
      success: true,
      message: 'Login Successfully',
      accessToken,
      user: {
        id: userExist._id,
        username: userExist.name,
        email: userExist.email,
        role: userExist.role 
      }
    })
  } catch (error) {
    console.log(`An error occured: ${error.message}`)
    res.status(500).json({ message: 'Internal or Server error' })
  }
}

const refresh = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })
  const refreshToken = cookies.jwt
  
  try {
    const verifyToken = JWT.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET)
    const userExist = await User.findOne({ _id: verifyToken.id })
    if (!userExist) return res.status(401).json({ message: 'Unauthorized' })

    const accessToken = JWT.sign(
      { id: userExist._id, role: userExist.role, email: userExist.email, name: userExist.name }, 
      process.env.JWT_ACCESS_TOKEN_SECRET, 
      { expiresIn: '10m' }
    )
    res.status(200).json({ accessToken })
  } catch (error) {
    console.log(`Error cannot verify token: ${error.message}`)
    res.status(403).json({ message: 'Forbidden' })
  }
}

const logout = async (req, res) => {
  const currentUser = req.user
  await logBusinessAction({
    userId: currentUser.id,
    userEmail: currentUser.email,
    action: 'USER_LOGGEDOUT',
    targetId: currentUser.id,
    targetModel: 'User',
    details: { name: currentUser.name },
    req 
  })

  res.clearCookie('jwt', { httpOnly: true, sameSite: isProduction ? 'none' : 'lax', secure: isProduction,path: '/' })
  res.status(200).json({ message: 'Logout Successfully' })  
}

module.exports = { register, login, refresh, logout }