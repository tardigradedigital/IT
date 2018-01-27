var passport = require('passport');

exports.authenticate = function(req, res, next) {
  req.body.username = req.body.username.toLowerCase();
  var auth = passport.authenticate('WindowsAuthentication', {
      successRedirect: '/', 
      failureRedirect: '/login', 
      failureFlash: true
    }, function(err, user) {
      if(err) { return next(err); }
      if(!user) {res.send({ success: false })}
      req.logIn(user, function(err) {
        if(err) { return next(err); }
        res.send({ success: true, user: user });
      });
    });
  auth(req, res, next);
}

exports.revokeAuth = function(req, res) {
  req.logout();
  res.end();
}

exports.requiresApiLogin = function() {
  return function(req, res, next) {
    if(!req.isAuthenticated()) { res.status(403); res.end(); }
    else next();
  }
}

exports.requiresRole = function(role) {
  return function(req, res, next) {
    if(!req.isAuthenticated()) { res.status(403); res.end(); }
    else {
      if(typeof role === 'object') {
        var found = false;
        role.forEach(function(rl) {
          if(req.user.roles.indexOf(rl) !== -1) found = true;
        });
        if(!found) { res.status(403); res.end(); }
        else next();
      }
      else if(req.user.roles.indexOf(role) !== -1) next();
      else{ res.status(403); res.end(); }
    }
  }
}