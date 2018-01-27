var passport = require('passport'),
mongoose = require('mongoose'),
WindowsStrategy = require('passport-windowsauth'),
User = mongoose.model('User'),
fs = require('fs');

module.exports = function(config) {
passport.use(new WindowsStrategy({
ldap: {
  url: config.ldap.ldapUrl,
  base: config.ldap.baseDC,
  bindDN: config.ldap.bindDN,
  bindCredentials: config.ldap.bindPass,
  reconnect: true,
  tlsOptions: {
    rejectUnauthorized: true,
    ca: [ fs.readFileSync(__dirname + '/ca.pem') ]
  }
},
integrated: false
}, function(profile, done) {
if(!profile) { done(null, null); }
else {
  User.findOne({'userName': profile._json.sAMAccountName}, function(err, user) {
    if(user) {
      done(null, user);
    }
    else {
      var newuser = new User();
      newuser.getRoles(profile._json.sAMAccountName).then(function(userRoles) {
        var account = {
          userName: profile._json.sAMAccountName,
          firstName: profile._json.givenName,
          lastName: profile._json.sn,
          emailAddress: profile._json.mail,
          roles: userRoles,
          viewSettings: {
            it: {
              invCat: 'All Categories',
              invLimit: 30,
              invPage: 1,
              poLimit: 30
            }
          }
        };
        User.create(account, function (err, user) {
          if(err) {
            if(err.toString().indexOf('E11000') > -1) {
              err = new Error('Duplicate username');
            }
          }
          done(null, user);
        })
      });
    }
  })
}
}));

passport.serializeUser(function(user, done) {
if(user) {
  done(null, user.userName);
}
});

passport.deserializeUser(function(id, done) {
User.findOne({'userName': id}).exec(function(err, user) {
  if(user) {
    return done(null, user);
  }
  else {
    return done(null, false);
  }
})
});

}