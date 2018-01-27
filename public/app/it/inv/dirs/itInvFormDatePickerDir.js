angular.module('it').directive('datepicker', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, controller) {
      element.datepicker({
        dateFormat: 'mm/dd/yy',
        onSelect: function(date) {
          scope.date = date;
          scope.$apply();
        },
        showAnim: 'blind',
        defaultDate: Date.now()
      })
    }
  }
});