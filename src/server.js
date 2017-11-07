const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const async = require('async');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

const app = express();
const { mongodb } = require('./config/mongodb');

// settings
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'layout',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  extname: '.hbs'
}))
app.set('view engine', '.hbs');

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(morgan('dev'));
// session = memory store, if you want to preserve the data for future use store it in mongob or redis
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret:'mysecretword',
  store: new MongoStore({url: mongodb.url})
}));
app.use(flash());

// routes
app.use(require('./routes/index'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(3000, (err) => {
  if (err) { console.log(err); }
  else { console.log('Server is running');}
})
