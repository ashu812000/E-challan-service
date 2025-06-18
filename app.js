let express = require('express');
let path = require('path');
const cors = require('cors');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let eChalan = require('./routes/e-chalan');
let shops = require('./routes/shops');
let products = require('./routes/products');
let auth = require('./routes/auth');
require('dotenv').config();



let app = express();
require('./database/database');  // connect to DB
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', eChalan);
app.use('/auth', auth);
app.use('/shops', shops);
app.use('/products', products);

module.exports = app;
