angular.module('it').controller('itTeapotCtrl', function($scope, itInvSvc, itUserResSvc, itInvMetadataSvc) {
  $scope.mongo = {
    count: 0
  }
  $scope.sql = {
    count: 0,
    cats: [],
    manufs: [],
    parts: [],
    stores: [],
    supls: []
  }
  $scope.initParts = function() { itInvSvc.getParts().then(function(res) {$scope.sql.parts = res}) };
  $scope.initPartCount = function() { itInvSvc.getParts().then(function(res) {$scope.sql.count = res.length}) };
  $scope.initUserCount = function() { itUserResSvc.count().$promise.then(function(res) {$scope.mongo.count = res.data}) };
  $scope.initCats = function() { itInvMetadataSvc.catModel().then(function(res) {console.log(res); $scope.sql.cats = res}) };
  $scope.initManufs = function() { itInvMetadataSvc.manufModel().then(function(res) {console.log(res); $scope.sql.manufs = res}) };
  $scope.initStores = function() { itInvMetadataSvc.storeModel().then(function(res) {console.log(res); $scope.sql.stores = res}) };
  $scope.initSupls = function() { itInvMetadataSvc.suplModel().then(function(res) {console.log(res); $scope.sql.supls = res}) };
});