angular.module('it').filter('postatus', function() {
    return function(status) {
      var statusOut = '';
      switch(status) {
        case 0:
          statusOut = 'New';
          break;
        case 1:
          statusOut = 'In Review';
          break;
        case 2:
          statusOut = 'Approved';
          break;
        case 3:
          statusOut = 'Declined';
          break;
        case 4:
          statusOut = 'In Progress';
          break;
        case 5:
          statusOut = 'Complete';
          break;
      }
      return statusOut;
    }
  });