angular.module('it').factory('itProfileResSvc', function($resource) {
  var baseURL = '/api/me';
  var MeResource = $resource(baseURL, {}, {
    update: {
      method: 'POST',
      isArray: false
    }
  });

  return MeResource;  
});
