var tedious = require('tedious').Connection;

module.exports = function(config) {
  var mssql = config.mssql;
  var db = new tedious({
    domain: mssql.dbDomain,
    userName: mssql.dbUser,
    password: mssql.dbPass,
    server: mssql.dbHost,
    options: {
      database: mssql.db,
      encrypt: true
    }
  });
  db.once('connect', function(err) {
    if(err) console.log('An error occurred connecting to SQL Server...', err)
    else console.log('Connected to ' + config.dbSite + ' [mssql://' + mssql.dbHost + '/' + mssql.db + ']');
  });
};