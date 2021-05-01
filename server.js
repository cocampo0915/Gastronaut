// require our modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const port = process.env.PORT || 3000;

// Load the env vars
require('dotenv').config();

// routers
const indexRouter = require('./routes/index');
const destinationRouter = require('./routes/destination');
const menuRouter = require('./routes/menu');
const commentsRouter = require('./routes/comments');

// initialize the express app
const app = express();

// config app settings app.set()
app.set('view engine', 'ejs');

// require db config module
require('./config/database');
// initialize oauth process for login requests by simply running the code inside of ./config
require('./config/passport');

// mount our middleware
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// add session middleware here
app.use(session({
    secret: 'SEIRRocks',
    resave: false,
    saveUninitialized: true
}));

// add passport middleware
app.use(passport.initialize());
app.use(passport.session());

// mount our routes app.use()
app.use('/', indexRouter);
app.use('/destinations', destinationRouter);
app.use('/', menuRouter);
app.use('/comments', commentsRouter);

// tell app to listen on a port for requests

app.listen(port, () => {
    console.log('Express is listening for requests from the browser')
})