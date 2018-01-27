angular.module('it').factory('itUserResSvc', function($resource) {
  var baseURL = '/api/users';

  var UserResource = $resource(baseURL, {}, {
    count: {
      method: 'GET',
      isArray: false,
      url: baseURL + '/total'
    },
    update: {
      method: 'PUT',
      isArray: false,
      url: baseURL + '/:id',
      params: {
        id: '@id'
      }
    },
    purge: {
      method: 'PURGE',
      isArray: false,
      url: baseURL + '/:id',
      params: {
        id: '@id'
      }
    }
  });
  
  UserResource.prototype.isAdmin = function() {
    return this.roles && this.roles.indexOf('admin') > -1;
  }
  
  return UserResource;
})