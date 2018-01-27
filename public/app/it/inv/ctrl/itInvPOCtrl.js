angular.module('it').controller('itInvPOCtrl', function($scope, itInvSvc, itInvMetadataSvc, itProfileSvc, itProfileResSvc) {
  $scope.userView = itProfileSvc.it;
  $scope.poModel = itInvMetadataSvc.poModel;
  $scope.viewOptions = {
    limits: [10, 30, 50, 100],
  }
  $scope.pos = {
    pos: [],
    poChange: [],
    poCount: 0,
    poEdit: false,
    poFocus: [],
    poLoaded: false
  }

  $scope.getPOs = function() { itInvSvc.getPOs().then(function(res) { $scope.pos.pos = res.data; $scope.pos.poCount = res.length })}

  $scope.$watch('userView', function(newValue, oldValue, scope) {
    if(newValue !== oldValue) {
      var updateSet = {
        _id: itProfileSvc.id,
        viewSettings: itProfileSvc.full
      }
      updateSet.viewSettings.it = newValue;
      if(newValue.poSearch !== oldValue.poSearch) updateSet.viewSettings.it.poPage = 1;
      if(newValue.poLimit !== oldValue.poLimit && ($scope.pos.poCount / newValue.poLimit) < newValue.poPage) { updateSet.viewSettings.it.poPage = 1; }
      itProfileResSvc.update(updateSet).$promise.then(function(response) {
        itProfileSvc.update(updateSet);
        $scope.getPOs();
      })
    }
  }, true);
});