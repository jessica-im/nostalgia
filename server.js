//////////////////////////////////
//        DEPENDENCIES
//////////////////////////////////

const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const session = require('express-session')

//////////////////////////////////
//           CONFIG
//////////////////////////////////

const app = express ();
require('dotenv').config()
const db = mongoose.connection;
const PORT = process.env.PORT || 3003;

//////////////////////////////////
//          DATABASE
//////////////////////////////////
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//////////////////////////////////
//         MIDDLEWARE
//////////////////////////////////

app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUnintialized: false,
    })
)

//////////////////////////////////
//        CONTROLLERS
//////////////////////////////////

const capsuleController = require('./controllers/capsule_controller.js')
const userController = require('./controllers/users_controller.js')
const sessionsController = require('./controllers/sessions_controller.js')

app.use('/timecapsule', capsuleController)
app.use('/users', userController)
app.use('/sessions', sessionsController)

//////////////////////////////////
//           ROUTES
//////////////////////////////////
//localhost:3000
app.get('/' , (req, res) => {
  res.redirect('/timecapsule');
});

//////////////////////////////////
//          LISTENER
//////////////////////////////////
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
