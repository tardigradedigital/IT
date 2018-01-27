angular.module('it').factory('itProfileSvc', function(itIdentitySvc) {
  var preferences = {
    id: itIdentitySvc.currentUser._id,
    full: itIdentitySvc.currentUser.viewSettings,
    it: itIdentitySvc.currentUser.viewSettings.it
  }
  var updateFound = false
  return {
    id: preferences.id,
    full: preferences.full,
    it: preferences.it,
    update: function(updateData) {
      preferences.id = updateData._id;
      preferences.full = updateData.viewSettings;
      preferences.it = updateData.viewSettings.it;
    }
  }
});