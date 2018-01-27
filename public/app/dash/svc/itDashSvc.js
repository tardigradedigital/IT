angular.module('it').factory('itDashSvc', function($q, itDashResSvc) {
  return {
    getParts: function() {
      var parts = itDashResSvc.query();
      var dfd = $q.defer();

      parts.$promise.then(function(res) {
        console.log(res)
        dfd.resolve(res);
      }, function(response) {
        dfd.reject(response.data.reason);
      });

      return dfd.promise;
    }
  }
});