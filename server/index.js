const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRouter = require('./routes/auth/auth-routes')
const adminProductsRouter = require('./routes/admin/products-routes')
const shopProductsRouter = require('./routes/shop/shop-routes')
const shopCartRouter = require('./routes/shop/carts-routes')
const shopAddressRoute = require('./routes/shop/address-routes')
const shopOrderRoute = require('./routes/shop/order-routes')
const { authMiddleware } = require('./controllers/auth/auth-controller')
const adminOrderRouter = require('./routes/admin/adminOrder-routes')
const searchRouter = require('./routes/shop/searchRoutes')
require('dotenv').config()


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => { console.log(err) })



const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials: true
    })
);


app.use(cookieParser());
app.use(express.json());
app.use(
    express.urlencoded({ extended: true })
)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});



app.use('/api/auth', authRouter)
app.use('/api/admin/products', adminProductsRouter)
app.use('/api/shop/products', shopProductsRouter)
app.use('/api/shop/cart', shopCartRouter)
app.use('/api/shop/address', shopAddressRoute)
app.use('/api/shop/order', shopOrderRoute)
app.use('/api/admin/orders',adminOrderRouter)
app.use('/api/shop/search',searchRouter)
app.get('/', async(req,res) => {
    res.status(200).json({
        success: true,
        message: "Successful connection"
    })
})

app.listen(PORT, () => {
    console.log(`Server listining on PORT ${PORT}`)
})
