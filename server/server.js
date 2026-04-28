const express = require('express')
const dotenv = require('dotenv').config()
const DBconnection = require('./config/db')

const app = express()

const authRoutes = require('./routes/authRoutes')
const itemRoutes = require('./routes/itemRoutes')
const {authenticate, authorize} = require('./middleware/authMiddleware')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 3000

DBconnection()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use(authRoutes)
app.use(itemRoutes)

app.get('/profile', authenticate, (req, res) => {
  res.send('User profile')
})

app.get('/profile/admin', authenticate, authorize(["admin", "store_manager", "department_user", "procurement"]), (req, res) => {
  res.send('only Admin profile')
})

app.listen(PORT, () => console.log(`Server is running on port:  ${PORT}`))