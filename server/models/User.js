var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption'),
    ldap = require('ldapjs'),
    ldapc = require('../utilities/ldap'),
    Q = require('q'),
    config = require('../config/config')[(process.env.NODE_ENV || 'development')];

var userSchema = mongoose.Schema({
  firstName: {type: String, required: '{PATH} is required.'},
  lastName: {type: String, required: '{PATH} is required.'},
  userName: {
    type: String, 
    required: '{PATH} is required.',
    unique: true
  },
  emailAddress: {type: String, required: '{PATH} is required.'},
  roles: [String],
  viewSettings: mongoose.Schema.Types.Mixed
}, {collection: 'cbcit_users'});
userSchema.methods = {
  hasRole: function(role) {
    return this.roles.indexOf(role) > -1;
  },
  getRoles: function(user) {
    var roleGroups = [
      'AirWatch Access Group:::awuser', 
      'Inventory Access Group:::invuser', 
      'Inventory Admin Access Group:::invadm',
      'Inventory Maintenance Access Group:::invmnt',
      'Inventory Reporting Access Group:::invrep',
      'IT Access Group:::ituser',
      'IT Admin Access Group:::admin'
    ]
    function goLdapSearch(ur) {
      var arkey = roleGroups.shift();
      var pair = arkey.split(':::');
      var deferred = Q.defer();
      var lclient = ldapc.createClient();
      lclient.bind(config.ldap.bindDN, config.ldap.bindPass, function(err) {if(err) { console.log('Bind error: ' + err)} });
      lclient.search(config.ldap.baseDC, {
        filter: '(&(objectClass=user)(sAMAccountName=' + user + ')(memberOf=CN=' + pair[0] + ',OU=IT Groups,OU=Security Groups,OU=MyBusiness,' + config.baseDC + '))',
        scope: 'sub',
        attributes: ['sAMAccountName']
      }, function(err, res) {
        res.on('searchEntry', function(entry) { ur.push(pair[1]); });
        res.on('error', function(err) { console.log('LDAP error: ', err.message); })
        res.on('end', function(result) { deferred.resolve(ur) })
      });
      return deferred.promise;
    }
    var roles = [goLdapSearch, goLdapSearch, goLdapSearch, goLdapSearch, goLdapSearch, goLdapSearch, goLdapSearch];
    var userRoles = [];
    return roles.reduce(function(nextPr, f) { return nextPr.then(f); }, Q(userRoles));

    // return goLdapSearch('AirWatch Access Group', 'awuser', userRoles).
    //   then(function(res) { goLdapSearch('Inventory Access Group', 'invuser', res) }).
    //   then(function(res) { goLdapSearch('IT Access Group', 'ituser', res) }).
    //   then(function(res) { goLdapSearch('IT Admin Access Group', 'admin', res) }).
    //   catch(function(err) { console.log('Error retrieving roles: ' + err.message); });

    // Object.keys(roleGroups).forEach(function(key) {
    // });
    // console.log(rolesRec);
    // roleResponse().then(function(res) { console.log('Role response: ' + res); return res; })
  }
}
  
var User = mongoose.model('User', userSchema);