var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const redis = require('redis');
const connectRedis = require('connect-redis');
const session = require('express-session');
const passport = require('./components/auth/passport.js');
const mongoose = require('mongoose');
const Handlebars = require('hbs');


//define router
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const ordersRouter = require('./routes/order');
const VaccineListRouter = require('./routes/Vaccine_list');
const FAQRouter = require('./routes/FAQ');
const authRouter = require('./components/auth');

// ===== redis session =========\\

const RedisStore = connectRedis(session)
//Configure redis client
let redisClient;
if(process.env.REDIS_CLOUD == 'true'){
    redisClient = redis.createClient({
    url: process.env.REDIS_URL,
    //host: process.env.REDIS_HOST_CLOUD,
    //port: process.env.REDIS_PORT_CLOUD,
    //password: process.env.REDIS_PASSWORD_CLOUD,
  });
}
else{
    redisClient = redis.createClient({
    host: process.env.REDIS_HOST_LOCAL,
    port: process.env.REDIS_PORT_LOCAL,
  });
}

redisClient.on('error', function (err) {
  console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
  console.log('Connected to redis successfully');
});

const config = require('./config')
const resgisterVaccination = require('./routes/registerVaccinational')
const vaccineRouter = require('./routes/vaccine')
const categoryRouter = require('./routes/category')
const branchRouter = require('./routes/branch')
var app = express();

//===== create app and set configs =====\\
var app = express();
// view engine setup
Handlebars.registerHelper('selectDistrics', function(cityList, idCity){
  let districtsList = cityList.filter(item => item.province_code == idCity)
  return districtsList
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// enable this if you run behind a proxy (e.g. nginx)
app.set('trust proxy', 1);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Configure session middleware
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'secret$%^134',
  resave: false,
  saveUninitialized: false,
  cookie: {
      secure: false, // if true only transmit cookie over https
      //httpOnly: false, // if true prevent client side JS from reading the cookie 
      maxAge: 1000 * 60 * 5 // session max age in miliseconds, 5 minutes
  }
}));
//Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

//===== set router =====\\
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/order', ordersRouter);
app.use('/Vaccine_list', VaccineListRouter);
app.use('/FAQ', FAQRouter);
app.use('/login', authRouter);
app.use('/logout', authRouter);
app.use('/register', authRouter);
app.use('/register-vaccination', resgisterVaccination)
app.use('/vaccine', vaccineRouter)
app.use('/category', categoryRouter)
app.use('/branch', branchRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

/*Connect mongodb*/
const connectionParams={
  useNewUrlParser: true,
  useUnifiedTopology: true 
}
mongoose.connect(config.URL_MONGODB,connectionParams)
  .then( () => {
      console.log('Connected to mongoBD!!')
  })
  .catch( (err) => {
      console.error(`Error connecting to the mongoDb. \n${err}`);
  })

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
