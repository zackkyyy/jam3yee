' use strict '
const path = require('path')
const Mongoose = require('./dbHandlar/dbHandler')
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser')

var app = express()
const PORT = 3030
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

// Call the database class and connect 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

var mongoose = new Mongoose()
mongoose.connect()
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'hbs')
app.set('view options', { layout: 'main' });


var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(session({
  name: 'serversessionforassign2',
  secret: 'thisisasecret',
  saveUninitialized: false,   //created and not modified sessions
  resave: false,              //if the request has no changes on the session
  cookie: {
    secure : false,
    maxAge : 1000 * 60 * 60 * 1,
    httpOnly: true        //http only so the clinet script cannot mess with it
  }
}))


app.use('/',require('./routes/userRouter'))

let server = app.listen(PORT, function () {
    var host = server.address().address
    console.log('Server is connected: Start " localhost:' + PORT + ' in your web browser')

});
