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
const allowedOrigin = 'http://localhost:8080';

app.use(cors({
    origin: allowedOrigin,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', eChalan);
app.use('/auth', auth);
app.use('/shops', shops);
app.use('/products', products);
app.use('/otp', otpRoutes);
app.use('/order', orderRoutes);

module.exports = app;
