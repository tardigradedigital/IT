angular.module('it').factory('itInvResSvc', function($resource, itProfileSvc) {
  var baseURL = '/api/inv';

  function getLimit() { return itProfileSvc.it.invLimit; }
  function getPage() { return itProfileSvc.it.invPage; }
  function getCat() { return itProfileSvc.it.invCat; }
  function getPartSearch() { return itProfileSvc.it.invSearch; }
  function getPOSearch() { return itProfileSvc.it.poSearch; }
  
  var InvResource = $resource(baseURL, {}, {
    getParts: {
      method: 'GET',
      isArray: false,
      url: baseURL + '/parts',
      params: {
        limit: getLimit,
        page: getPage,
        cat: getCat,
        search: getPartSearch
      }
    },
    getPart: {
      method: 'GET',
      isArray: false,
      url: baseURL + '/parts/:partNum'
    },
    getPOs: {
      method: 'GET',
      isArray: false,
      url: baseURL + '/po',
      params: {
        limit: getLimit,
        page: getPage,
        search: getPOSearch
      }
    },
    getPO: {
      method: 'GET',
      isArray: false,
      url: baseURL + '/po/:poNum'
    },
    getCategories: {
      method: 'GET',
      isArray: true,
      url: baseURL + '/categories'
    },
    getManufacturers: {
      method: 'GET',
      isArray: true,
      url: baseURL + '/manufacturers'
    },
    getStores: {
      method: 'GET',
      isArray: true,
      url: baseURL + '/stores'
    },
    getSuppliers: {
      method: 'GET',
      isArray: true,
      url: baseURL + '/suppliers'
    },
    updatePart: {
      method: 'PUT',
      isArray: false,
      url: baseURL + '/parts'
    }
  });

  return InvResource;  
});
