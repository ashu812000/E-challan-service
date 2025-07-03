let express = require('express');
let path = require('path');
const cors = require('cors');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let eChalan = require('./routes/e-chalan');
let shops = require('./routes/shops');
let products = require('./routes/products');
let auth = require('./routes/auth');
const otpRoutes = require('./routes/otp');
const orderRoutes = require('./routes/order');
require('dotenv').config();


let app = express();
require('./database/database');  // connect to DB
app.use(logger('dev'));


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const allowedOrigins = [
    'http://localhost:8080',
    'http://13.200.121.204',
    'https://rasan-seva-portal.vercel.app',
    'https://rasan-seva-portal.vercel.app/',
    'https://www.upfpcl.com',
    'https://www.upfpcl.com/',
    'http://www.upfpcl.com'
];


app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));


app.use('/', eChalan);
app.use('/auth', auth);
app.use('/shops', shops);
app.use('/products', products);
app.use('/otp', otpRoutes);
app.use('/order', orderRoutes);

module.exports = app;
