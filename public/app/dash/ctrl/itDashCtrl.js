angular.module('it').controller('itDashCtrl', function($scope, itDashSvc) {
  $scope.results = null
  $scope.test = function() {
    $scope.results = (itDashSvc.getParts()).$$state;
    console.log($scope.results)
  }
});