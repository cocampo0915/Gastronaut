// require our modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');

// routers
const indexRouter = require('./routes/index');
const destinationRouter = require('./routes/destination');
const menuRouter = require('./routes/menu');

// initialize the express app
const app = express();

// config app settings app.set()
app.set('view engine', 'ejs');

// require db config module
require('./config/database');

// mount our middleware
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// mount our routes app.use()
app.use('/', indexRouter);
app.use('/destinations', destinationRouter);
app.use('/', menuRouter);

// tell app to listen on a port for requests
const port = 3000;
app.listen(port, function() {
    console.log('Express is listening for requests from the browser')
})