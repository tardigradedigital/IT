angular.module('it').factory('itInvSvc', function($q, itInvResSvc) {
  function resolve(obj, dfd) {
    obj.$promise.then(
      function(res) { console.log(res); dfd.resolve(res); },
      function(res) { dfd.reject(res.data.reason); }
    );
  }
  return {
    getPart: function(partNum) {
      var dfd = $q.defer();
      resolve(itInvResSvc.getPart({partNum: partNum}), dfd);
      return dfd.promise;
    },
    getParts: function() {
      var dfd = $q.defer();
      resolve(itInvResSvc.getParts(), dfd);
      return dfd.promise;
    },
    getPO: function(poNum) {
      var dfd = $q.defer();
      resolve(itInvResSvc.getPO({poNum: poNum}), dfd);
      return dfd.promise;
    },
    getPOs: function() {
      var dfd = $q.defer();
      resolve(itInvResSvc.getPOs(), dfd);
      return dfd.promise;
    },
    updatePart: function(partPack) {
      var dfd = $q.defer();
      resolve(itInvResSvc.updatePart({payload: partPack}), dfd);
      return dfd.promise;
    }
  };
});