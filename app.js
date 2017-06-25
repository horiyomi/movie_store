const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const expressNunjucks = require('express-nunjucks');
const config = require('./config/database');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const flash = require('connect-flash');

// Establish connection
mongoose.connect(config.database);
// Testing connection if error
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to mongoDB...')
});

let app = express();

// Setting up static folder
app.use(express.static(path.join('public')));
// Setting up views folder
app.set('views',path.join(__dirname,'/views'));

// setting up Pug template engine
app.set('view engine', 'pug');

// Middlewares
// body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Session Middleware
const session = require('express-session')
app.use(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true }
    }));
// validation
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
// Importing Flash Middleware
app.use(flash());

// Importing movie model
let Movie = require('./models/movie');

app.get('/',(req,res)=>{
    res.render('index');
});

// registering users
const user = require('./router/users');
app.use('/users',user);


app.listen(3000,()=>{
    console.log('Listening on port 3000...');
});
