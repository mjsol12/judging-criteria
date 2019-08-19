// setup global variables
import DataService from './database/provider/mongodb.provider';
import Logger from './utilities/Logger';
import SystemConfig from './utilities/SystemConfig';

require('./utilities/Global');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// config
const {APP_PORT, SECURE_SESSION_KEY: SECRET_SESSION_KEY} = SystemConfig;

// Server APIs
const protectedRoutes = [
    require('./routers/pss/candidate.api'),
    require('./routers/pss/judge.api')
];


// const SERVER_VERSION = require('../package.json').version;

const app = express();

app.use(morgan(function (tokens, req, res) {
  return [
    new Date(),
    '-',
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}));

app.use(require('helmet')());

if (SystemConfig.enableCrossOrigin) {

  app.use(require('cors')({
    credentials: true,
    origin: true
  }));

}

app.use(require('cookie-parser')());

app.use(bodyParser.json({limit: '32MB'}));

app.use(bodyParser.urlencoded({limit: '32MB', extended: true}));

// Cookie and session
app.use(session({
  secret: SECRET_SESSION_KEY,
  saveUninitialized: true, // don't create session until something stored
  resave: true,
  maxAge: 3600000 * 24 * 5, // 5 days
  store: new MongoStore({url: DataService.fullURL, touchAfter: 3 * 3600})
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());
require('./auth/passport')(passport);

// // Return server version
// app.get('/api/version', (req, res, next) => {
//   res.status(200).json(SERVER_VERSION + '-' + process.env.NODE_ENV);
// });

// Authentication APIs
app.use('/api/auth', require('./routers/auth')(passport));

for (const route of protectedRoutes) {
  app.use('/api/v1', (req, res, next) => {
    if (!req.isAuthenticated()) {
      next();
    } else {
      res.sendStatus(401);
    }
  }, route);
}

// set APP_PORT
app.set('port', APP_PORT);

// listen to server APP_PORT
app.listen(APP_PORT, () => Logger.info(`Server is running at port: ${APP_PORT}`));
