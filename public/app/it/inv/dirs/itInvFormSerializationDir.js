angular.module('it').filter('serialization', function() {
  return function(serialType) {
    var serialOut = '';
    switch(serialType) {
      case 2:
        serialOut = 'Advanced';
        break;
      case 1:
        serialOut = 'Simple';
        break;
      case 0:
      default:
        serialOut = 'None';
        break;
    }
    return serialOut;
  }
});