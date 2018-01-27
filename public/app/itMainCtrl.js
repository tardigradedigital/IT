angular.module('it').controller('itMainCtrl', function($scope, $location, $window) {
  $scope.version = $window.ver;
  $scope.location = $location.path();
  $scope.$on('$routeChangeSuccess', function() { $scope.location = $location.path(); })
});