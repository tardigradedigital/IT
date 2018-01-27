var express  = require('express'),
    compression = require('compression'),
    https = require('https'),
    fs = require('fs'),
    path = require('path'),
    cors = require('cors');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();
app.use(cors());
app.use(compression());
var config = require('./server/config/config')[env];
var ssl = {
    key: fs.readFileSync(__dirname + '/server/config/' + config.ssl.key),
    cert: fs.readFileSync(__dirname + '/server/config/' + config.ssl.cert),
    passphrase: config.ssl.pass
}

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/tedious')(config);
require('./server/config/passport')(config);
require('./server/config/routes')(app, env, config.version, config.dbSite);

var srv = https.createServer(ssl, app);
srv.listen(config.port);
srv.timeout = 600000;
srv.on('error', function(err) { console.log('Caught error: ', err.message); });
console.log('Running ' + config.dbSite + ' on port', config.port);
if(env !== 'development') {
    var http = require('http');
    var redir = http.createServer(function(req, res) {
        res.writeHead(301, {'Location': 'https://' + req.headers['host'] + req.url});
        res.end();
    }).listen(80);
    console.log('Running HTTPS enforcement on port 80');
}