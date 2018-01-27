angular.module('it').factory('itAuthSvc', function($http, $q, $route, itIdentitySvc, itUserResSvc) {
  return {
    // authenticateUser: Verifies login credentials and signs in user
    authenticateUser: function(username, password) {
      var dfd = $q.defer();
      $http.post('/login', {username:username, password:password}).then(function(response) {
        if(response.data.success) {
          var user = new itUserResSvc();
          angular.extend(user, response.data.user);
          itIdentitySvc.currentUser = user;
          $route.reload();
          dfd.resolve(true);
        }
        else {
          dfd.resolve(false);
        }
        dfd.resolve(true);
      });
      return dfd.promise;
    },
    
    // createUser: Creates a new user
    // createUser: function(newUserData) {
    //   var newUser = new stUserSvc(newUserData);
    //   var dfd = $q.defer();
      
    //   newUser.$save().then(function() {
    //     dfd.resolve();
    //   }, function(response) {
    //     dfd.reject(response.data.reason);
    //   })
      
    //   return dfd.promise;
    // },
    
    // logoutUser: Ends the current user's session
    logoutUser: function() {
      var dfd = $q.defer();
      $http.post('/logout', {logout: true}).then(function() {
        itIdentitySvc.currentUser = undefined;
        $route.reload();
        dfd.resolve();
      });
      return dfd.promise;
    },
    
    // purgeUsers: Removes all users and restores user database to defaults
    // purgeUsers: function() {
    //   var dfd = $q.defer();
    //   $http({
    //     method: 'PURGE',
    //     url: '/api/users'
    //   }).then(function() {
    //     console.log('User database has been purged');
    //     dfd.resolve();
    //   });
    //   return dfd.promise;
    // },
    
    // syncUsers: Syncs user database collection
    // syncUsers: function(direction) {
    //   var dfd = $q.defer();
    //   $http({
    //     method: 'COPY',
    //     url: '/api/db',
    //     headers: { 'Content-Type': 'application/json' },
    //     data: {
    //       collection: 'users',
    //       direction: direction
    //     }
    //   }).then(function() {
    //     console.log('User database has been synced');
    //     dfd.resolve();
    //   });
    //   return dfd.promise;
    // },
    
    // updateCurrentUser: Updates profile of current user
    // updateCurrentUser: function(newUserData) {
    //   var dfd = $q.defer();
      
    //   var clone = angular.copy(stIdentitySvc.currentUser);
    //   angular.extend(clone, newUserData);
    //   clone.$update().then(function() {
    //     stIdentitySvc.currentUser = clone;
    //     dfd.resolve();
    //   }, function(response) {
    //     dfd.reject(response.data.reason);
    //   });
    //   return dfd.promise;
    // },
    
    // routeAsAuthenticatedUser: Checks whether user is signed in
    routeAsAuthenticatedUser: function() {
      if(itIdentitySvc.isAuthenticated()) { return true; }
      else { return $q.reject('401'); }
    },
    
    // routeAsGuest: Checks whether user is signed in
    routeAsGuest: function() {
      if(!itIdentitySvc.isAuthenticated()) { return true; }
      else { return $q.reject('401'); }
    },
    
    // authorizeCurrentUserForRoute: Checks whether curent user has role
    authorizeCurrentUserForRoute: function(role) {
      if(typeof role === 'object') {
        var found = false
        role.forEach(function(rl) {
          if(itIdentitySvc.isAuthorized(rl)) { found = true; }
        });
        if(found) return true;
        else return false;
      }
      else if(itIdentitySvc.isAuthorized(role)) return true;
      else return $q.reject('403');
    }
  }
});