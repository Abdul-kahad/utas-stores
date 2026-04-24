const express = require('express')
const dotenv = require('dotenv').config()
const DBconnection = require('./config/db')
const app = express()

const PORT = process.env.PORT || 3000

DBconnection()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
  
app.get('/', (req, res) => {
  res.send('Welcome to UTAS Stores Server!')
})


app.listen(PORT, () => console.log(`Server is running on port:  ${PORT}`))