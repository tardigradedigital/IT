angular.module('it').factory('itDashResSvc', function($resource) {
  var TestResource = $resource('/api/test', {});

  return TestResource;  
});
