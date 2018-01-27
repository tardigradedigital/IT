angular.module('it').controller('itLoginCtrl', function($scope, $location, itAuthSvc, itIdentitySvc) {
  $scope.identity = itIdentitySvc;
  $scope.signin = function(username, password) {
    if(!username || !password || username.$invalid || password.$invalid) {
      if(!username || username.$invalid) { $(loginWidget.username).addClass('invalid'); }
      if(!password || password.$invalid) { $(loginWidget.password).addClass('invalid'); }
      // stTickerSvc.error('Please enter a valid email address and password.');
      return false;  
    }
    else {
      itAuthSvc.authenticateUser(username, password).then(function(success) {
        username, password, $scope.username, $scope.password = null;
        if(success) {
          var path = itIdentitySvc.isAuthorized('admin') ? '/admin' : '/';
          // stTickerSvc.notify('You have been successfully authenticated.');
          if($location.path('/login')) { $location.path(path); }
          if(itIdentitySvc.isAuthorized('admin')) { $location.path(path); }
        }
        else {
          $(loginWidget.username).addClass('invalid');
          $(loginWidget.password).addClass('invalid');
          // stTickerSvc.error('Invalid email address or password was given.')
        }
      });      
    }
  }
  
  $scope.signout = function() {
    itAuthSvc.logoutUser().then(function() {
      $scope.username = "";
      // stTickerSvc.notify('You have been signed out.');
      $location.path('/login');
    })
  }
});