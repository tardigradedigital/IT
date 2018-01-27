/*
  Use the following syntax to configure database
  connectivity for development and production.
  Save this file as config.js when done.
*/

var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
var ver = require(rootPath + '/package.json').version;

module.exports = {
  development: {
    mongo: {
      db: '<devMongoDbName>',
      dbHost: '<devMongoDbHostNameOrFQDN>',
      dbPass: '<devMongoDbPassword>',
      dbStr: 'mongodb://<devMongoDbUsername>:<devMongoDbPassword>@<devMongoDbHostNameOrFQDN>/<devMongoDbName>',
      dbUser: '<devMongoDbUsername>',
      dbSsl: false, // set to true if development database uses SSL,
    },
    mssql: {
      db: '<devSqlDbName>',
      dbHost: '<devSqlDbHostNameOrFQDN>',
      dbPass: '<devSqlDbPassword>',
      dbUser: '<devSqlDbUser>' // for domain, use format 'domain\\\\username' with 4 slashes
    },
    ldap: {
      ldapUrl: 'ldaps://<devLdapEndpointFQDN>:636/',
      baseDC: '<devLdapBase>', // use format 'DC=contoso,DC=local'
      bindDN: '<devLdapBindUser', // use format 'username@domain'
      bindPass: '<devLdapBindPass>'
    },
    sessions: {
      hostName: '<devSessHostName>', // hostname for cookie
      secret: '<devSessSecret>', // secret for session initialization
      collection: '<devSessCollection>' // MongoDB collection for sessions
    },
    ssl: {
      key: '<devKeyFile>', // private key file name
      cert: '<devCertFile>', // cert file name
      pass: '<devKeyPass>' // private key password
    },
    dbSite: '<devDbSiteName>', // Shows in console log when connected
    rootPath: rootPath,
    port: process.env.PORT || 8080,
    version: ver
  },
  production: {
    mongo: {
      db: '<prodMongoDbName>',
      dbHost: '<prodMongoDbHostNameOrFQDN>',
      dbPass: '<prodMongoDbPassword>',
      dbStr: 'mongodb://<prodMongoDbUsername>:<prodMongoDbPassword>@<prodMongoDbHostNameOrFQDN>/<prodMongoDbName>',
      dbUser: '<prodMongoDbUsername>',
      dbSsl: true, // set to true if development database uses SSL,
    },
    mssql: {
      db: '<prodSqlDbName>',
      dbHost: '<prodSqlDbHostNameOrFQDN>',
      dbPass: '<prodSqlDbPassword>',
      dbUser: '<prodSqlDbUser>' // for domain, use format 'domain\\\\username' with 4 slashes
    },
    ldap: {
      ldapUrl: 'ldaps://<prodLdapEndpointFQDN>:636/',
      baseDC: '<prodLdapBase>', // use format 'DC=contoso,DC=local'
      bindDN: '<prodLdapBindUser', // use format 'username@domain'
      bindPass: '<prodLdapBindPass>'
    },
    sessions: {
      hostName: '<prodSessHostName>', // hostname for cookie
      secret: '<prodSessSecret>', // secret for session initialization
      collection: '<prodSessCollection>' // MongoDB collection for sessions
    },
    ssl: {
      key: '<prodKeyFile>', // private key file name
      cert: '<prodCertFile>', // cert file name
      pass: '<prodKeyPass>' // private key password
    },
    dbSite: '<prodDbSiteName>', // Shows in console log when connected
    rootPath: rootPath,
    port: process.env.PORT || 443,
    version: ver
  }
}