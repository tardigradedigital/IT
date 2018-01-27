angular.module('it').controller('itInvCtrl', function($scope, $location, $routeParams, itInvSvc, itInvMetadataSvc, itProfileSvc, itProfileResSvc, dateFilter) {
  $scope.userView = itProfileSvc.it;
  $scope.partPath = $routeParams.part;
  $scope.partModel = itInvMetadataSvc.partModel;
  $scope.partView = function(partNum) { $location.path('/it/inventory/parts/' + partNum); }
  $scope.sideBar = true;
  $scope.viewOptions = {
    categories: [],
    limits: [10, 30, 50, 100],
    manufacturers: [],
    stores: [],
    suppliers: []
  }
  $scope.inventory = {
    parts: [],
    partChange: [],
    partCount: 0,
    partEdit: false,
    partFocus: [],
    partLoaded: false
  }
  $scope.testDate = dateFilter((Date.now()).toString(), 'MM/dd/yyyy')

  $scope.getCats = function() { itInvMetadataSvc.catModel().then(function(res) { $scope.viewOptions.categories = res; }) }
  $scope.getManufacturers = function() { itInvMetadataSvc.manufModel().then(function(res) { $scope.viewOptions.manufacturers = res; }) }
  $scope.getParts = function() { itInvSvc.getParts().then(function(res) { $scope.inventory.parts = res.data; $scope.inventory.partCount = res.length}) }
  $scope.getStores = function() { itInvMetadataSvc.storeModel().then(function(res) { $scope.viewOptions.stores = res; }) }
  $scope.getSuppliers = function() { itInvMetadataSvc.suplModel().then(function(res) { $scope.viewOptions.suppliers = res; }) }
  
  $scope.getPart = function(partNum) {
    $scope.inventory.partLoaded = false;
    itInvSvc.getPart(partNum).then(function(res) {
      $scope.inventory.partFocus = res.data[0];
      $scope.inventory.partLoaded = true;
      $scope.inventory.partChange = angular.copy(res.data[0]);
      ['CAT_INDEX',
        'CAT_NAME',
        'LOC_INDEX',
        'LOC_NAME',
        'MAN_INDEX',
        'MAN_NAME',
        'SUPL_INDEX',
        'SUPL_NAME',
        'PART_FRIENDLY'
      ].forEach(function(e) { delete $scope.inventory.partChange[e] });
    });
  }

  $scope.toggleEdit = function(revert) {
    if($scope.inventory.partEdit && !revert) $scope.updatePart();
    else if(revert) $scope.getPart($scope.inventory.partFocus.PART_NUM);
    $scope.inventory.partEdit = !$scope.inventory.partEdit;
  }

  $scope.updatePart = function() {
    itInvSvc.updatePart($scope.inventory.partChange).then(function() {
      $scope.getPart($scope.inventory.partFocus.PART_NUM);
    });
  }

  $scope.$watch('userView', function(newValue, oldValue, scope) {
    if(newValue !== oldValue) {
      var updateSet = {
        _id: itProfileSvc.id,
        viewSettings: itProfileSvc.full
      }
      updateSet.viewSettings.it = newValue;
      if(newValue.invCat !== oldValue.invCat) updateSet.viewSettings.it.invPage = 1;
      if(newValue.invSearch !== oldValue.invSearch) updateSet.viewSettings.it.invPage = 1;
      if(newValue.invLimit !== oldValue.invLimit && ($scope.inventory.partCount / newValue.invLimit) < newValue.invPage) { updateSet.viewSettings.it.invPage = 1; }
      itProfileResSvc.update(updateSet).$promise.then(function(response) {
        itProfileSvc.update(updateSet);
        $scope.getParts();
      })
    }
  }, true);
});