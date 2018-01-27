var express = require('express'),
    rateLimiter = require('express-rate-limit'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    helmet = require('helmet'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(session),
    passport = require('passport');

module.exports = function(app, config) {
  // API limiter configuration
  var limiter = new rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    delayMs: 0
  })
  app.set('views', config.rootPath + '/server/views');
  app.set('view engine', 'pug');
  app.use(logger('dev'));
  app.use(helmet());
  app.use('/api', limiter);
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(session({
    cookie: {
      secure: true,
      domain: config.sessions.hostName
    },
    name: 'sessionId',
    resave: false, 
    saveUninitialized: false,
    secret: config.sessions.secret, 
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: config.sessions.collection,
      touchAfter: 24 * 3600
    })
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(config.rootPath + '/public'));
}