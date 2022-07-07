var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const redis = require('redis');
const connectRedis = require('connect-redis');
const session = require('express-session');
const passport = require('./components/auth/passport');
const mongoose = require('mongoose');
const Handlebars = require('hbs');

//evaluating demo mongo vs redis
const MongoStore = require('connect-mongo')(session);


//define router
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const ordersRouter = require('./routes/order');
const VaccineListRouter = require('./routes/vaccineList');
const FAQRouter = require('./routes/FAQ');


const config = require('./config')
const resgisterVaccination = require('./routes/registerVaccinational')
const vaccineRouter = require('./routes/vaccine')
const categoryRouter = require('./routes/category')
const branchRouter = require('./routes/branch')
const ticketRouter = require('./routes/ticket')
const orderTicketRouter = require('./routes/orderTicket')
const historyRouter = require('./routes/injectionHistory')
const orderHistoryRouter = require('./routes/orderHistory')

const authRouter = require('./components/auth/authRouter');
const redisTest = require('./bin/testRedis/redis');
const customerRouter = require('./routes/customerRouter.js');

//===== create app and set configs =====\\
const app = express();
// view engine setup
Handlebars.registerHelper('selectDistrics', function (cityList, idCity) {
  let districtsList = cityList.filter(item => item.province_code == idCity)
  return districtsList
})

//customer sex, Male or Female
Handlebars.registerHelper('isMale', function (value) {
  return value == 'M';
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// enable this if you run behind a proxy (e.g. nginx)
app.set('trust proxy', 1);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/*Connect mongodb*/
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(config.URL_MONGODB, connectionParams)
  .then(() => {
    console.log('Connected to mongoBD!!')
  })
  .catch((err) => {
    console.error(`Error connecting to the mongoDb. \n${err}`);
  });


// ===== redis session =========\\
const RedisStore = connectRedis(session)
//Configure redis client
let redisClient;
if (process.env.REDIS_CLOUD == 'true') {
  redisClient = redis.createClient({
    legacyMode: true,
    socket: {
      host: process.env.REDIS_HOST_CLOUD,
      port: process.env.REDIS_PORT_CLOUD
    },
    password: process.env.REDIS_PASSWORD_CLOUD,
    retry_strategy: function (options) {
      if (options.error && options.error.code === 'ECONNREFUSED') {
        // End reconnecting on a specific error and flush all commands with
        // a individual error
        return new Error('The server refused the connection');
      }
      if (options.total_retry_time > 1000 * 60 * 60 * 24 * 365 * 10) {
        // End reconnecting after a specific timeout and flush all commands
        // with a individual error
        return new Error('Retry time exhausted');
      }
      if (options.attempt > 3) {
        // End reconnecting with built in error
        return undefined;
      }
      // reconnect after
      return Math.min(options.attempt * 100, 3000);
    }
  });
}
else {
  redisClient = redis.createClient({
    legacyMode: true,
    socket: {
      host: process.env.REDIS_HOST_LOCAL,
      port: process.env.REDIS_PORT_LOCAL,
    }
  });
}


//check connect to redis if not connect then return error
redisClient.on('error', (err) => console.log("Can't connect to redis ", err));

redisClient.on('ready', () => console.log('Redis is ready'));
redisClient.connect().catch(console.error);

//Configure session middleware
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRETKEY,
  resave: false,
  saveUninitialized: false,
  //unset: "destroy",
  cookie: {
    //secure: false, // if true only transmit cookie over https
    //httpOnly: false, // if true prevent client side JS from reading the cookie 
    maxAge: 1000 * 60 * 60 // session max age in miliseconds, 5 minutes
  }
}));

//
//EVALUATING DEMO REDIS VS MONGO
// app.use(session({
//   secret: 'SECRET KEY',
//   resave: false,
//   saveUninitialized: true,
//   store: new MongoStore({
//     url: 'mongodb://localhost:27017/test-app', //YOUR MONGODB URL
//     ttl: 14 * 24 * 60 * 60,
//     autoRemove: 'native'
//   })
// }))

//


app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error("oh no")) // handle error
  }
  next() // otherwise continue
})

//Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.user
  next();
});

//===== set router =====\\
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/order', ordersRouter);
app.use('/Vaccinelist', VaccineListRouter);
app.use('/FAQ', FAQRouter);
app.use('/register-vaccination', resgisterVaccination)
app.use('/vaccine', vaccineRouter)
app.use('/category', categoryRouter)
app.use('/branch', branchRouter)
app.use('/orderTicket', orderTicketRouter)
app.use('/ticket', ticketRouter)
app.use('/orderTicket', orderTicketRouter)
app.use('/history', historyRouter)

app.use('/orderHistory', orderHistoryRouter)
//khoa
app.use('/redis', redisTest);
app.use('/auth', authRouter);
app.use('/customer', customerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
