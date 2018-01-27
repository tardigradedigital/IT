angular.module('it').factory('itIdentitySvc', function($window, itUserResSvc) {
  var currentUser;
  if($window.user) {
    currentUser = new itUserResSvc();
    angular.extend(currentUser, $window.user);
  }
  return {
    currentUser: currentUser,
    isAuthenticated: function() { return !!this.currentUser; },
    isAuthorized: function(role) { return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1; }
  }
});