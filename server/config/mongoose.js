var mongoose = require('mongoose'),
  fs = require('fs'),
  userModel = require('../models/User'),
  bb = require('bluebird');

module.exports = function(config) {
  var mongo = config.mongo;
  mongoose.Promise = bb; // Set Mongoose to use BlueBird promise library
  mongoose.connect(('mongodb://' + mongo.dbUser + ':' + mongo.dbPass + '@' + mongo.dbHost + '/' + mongo.db), {
    useMongoClient: true,
    ssl: mongo.dbSsl, 
    sslCA: [
      fs.readFileSync(__dirname + '/gdca.pem'), // load CA certificates
      fs.readFileSync(__dirname + '/gdinca.pem') // load intermediate CA certificates
    ]
  });
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'An error occurred connecting to MongoDB...'));
  db.once('open', function callback() {
  console.log('Connected to ' + config.dbSite + ' [mongodb://' + mongo.dbHost + '/' + mongo.db + ']');
  });
};