const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const dotenv = require('dotenv').config()
const DBconnection = require('./config/db')

const app = express()


const authRoutes = require('./routes/authRoutes')
const itemRoutes = require('./routes/itemRoutes')
const requestRoutes = require('./routes/requestRoutes')
const {authenticate, authorize} = require('./middleware/authMiddleware')
const Supplier = require('./models/Supplier');
const userRoutes = require('./routes/userRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const receiptRoutes = require('./routes/receiptRoutes');
const adminRoutes = require('./routes/adminRoutes');

const PORT = process.env.PORT || 3000

const HOST = process.env.HOST || '0.0.0.0'

app.use(cors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }));

app.use(cookieParser())

DBconnection()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(authRoutes)
app.use(adminRoutes)
app.use(itemRoutes)
app.use(requestRoutes)
app.use(userRoutes)
app.use(supplierRoutes)
app.use(receiptRoutes)

// app.get('/profile', authenticate, (req, res) => {
//   res.send('User profile')
// })

// app.get('/profile/admin', authenticate, authorize(["admin", "store_manager", "department_user", "procurement"]), (req, res) => {
//   res.send('only Admin profile')
// })

// app.post('/api/addsupplier', async(req, res) => {
//   const {name, contact, address} = req.body
//   const newsup = {
//     name,
//     contact,
//     address
//   }
//   const sup = await Supplier.create(newsup)
//   res.status(201).json({message: 'supplier added'})
// })

app.listen(PORT, HOST,   () => console.log(`Server is running on http://${HOST}:${PORT}`))