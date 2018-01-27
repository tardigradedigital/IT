var ldap = require('ldapjs'),
    fs = require('fs'),
    config = require('../config/config')[(process.env.NODE_ENV || 'development')];

ldapClient = null;

exports.createClient = function() {
  if(ldapClient) return ldapClient;
  else {
    ldapClient = ldap.createClient({
      url: config.ldap.ldapUrl,
      reconnect: true,
      tlsOptions: {
        rejectUnauthorized: true,
        ca: [ fs.readFileSync(__dirname + '/../config/ca.pem') ]
      }
    });
    ldapClient.bind(config.ldap.bindDN, config.ldap.bindPass, function(err) {if(err) { console.log('Bind error: ' + err); assert.ifError(err); } });
    ldapClient.on('error', function(err) { /* console.log('Caught ', err.code) // Commented out for likely ECONNRESET */ })
    return ldapClient;
  }
}

exports.destroyClient = function() {
  if(!ldapClient) return true;
    else {
      ldapClient.unbind();
      ldapClient.destroy();
      return true;
    }
}