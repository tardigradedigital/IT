angular.module('it').factory('itInvMetadataSvc', function($q, itIdentitySvc, itInvResSvc) {
  return {
    partModel: {
      partName: { // String
        bindName: 'PART_NAME',
        fieldDisp: 'Part Name',
        fieldPlace: 'Part Name',
        fieldDesc: 'Enter a name to identify this part.',
        fieldFilt: /[a-zA-Z0-9 :,.\-_\/]{8,50}$/g,
        fieldLimit: 50
      },
      partDesc: { // String
        bindName: 'PART_DESC',
        fieldDisp: 'Description',
        fieldPlace: 'Description',
        fieldDesc: 'Enter a short phrase to describe this part.',
        fieldFilt: /[a-zA-Z0-9 :,.\-_\/]{1,250}$/g,
        fieldLimit: 250
      },
      partNum: { // String
        bindName: 'PART_NUM',
        fieldDisp: 'Part Number',
        fieldPlace: 'UPC Number',
        fieldDesc: 'Scan or enter the part UPC.',
        fieldFilt: /[a-zA-Z0-9 \-]{8,15}$/g,
        fieldLimit: 15
      },
      partCost: { // Decimal
        bindName: 'PART_COST',
        fieldDisp: 'Cost',
        fieldPlace: 'Cost',
        fieldDesc: 'Enter the standard cost of this item.',
        fieldFilt: /[0-9.]{5,9}$/g,
        fieldLimit: 9
      },
      partStore: { // Integer, lookup value
        bindName: 'PART_STORE',
        fieldDisp: 'Storage Location',
        fieldPlace: 0,
        fieldDesc: 'Select where this part is stored.',
        fieldFilt: /[0-9]{1,4}$/g,
        fieldLimit: 4
      },
      partStock: { // Integer
        bindName: 'PART_STOCK',
        fieldDisp: 'Stock',
        fieldPlace: 'Stock',
        fieldDesc: 'Enter the initial quantity for this part.',
        fieldFilt: /[0-9]{1,4}$/g,
        fieldLimit: 4
      },
      partCat: { // Integer, lookup value
        bindName: 'PART_CAT',
        fieldDisp: 'Category',
        fieldPlace: itIdentitySvc.isAuthorized('invmnt') ? 4 : 1,
        fieldDesc: 'Select the category for this part.',
        fieldFilt: /[0-9]{1,4}$/g,
        fieldLimit: 4
      },
      partNotes: { // Text
        bindName: 'PART_NOTES',
        fieldDisp: 'Notes',
        fieldPlace: 'Notes',
        fieldDesc: 'Enter any additional notes for this part.',
        fieldFilt: /[a-zA-Z0-9 :,.\-_\/]{0,250}$/g,
        fieldLimit: 250
      },
      partSupl: { // Integer, lookup value
        bindName: 'PART_SUPL',
        fieldDisp: 'Supplier',
        fieldPlace: 0,
        fieldDesc: 'Select the default supplier for this part.',
        fieldFilt: /[0-9]{1,4}$/g,
        fieldLimit: 4
      },
      partSuplUrl: { // Text
        bindName: 'PART_SUPLURL',
        fieldDisp: 'Supplier Link',
        fieldPlace: 'Supplier Link',
        fieldDesc: 'Enter the supplier URL link for this part.',
        fieldFilt: /[a-zA-Z0-9 :,.\-_\/]{0,250}$/g,
        fieldLimit: 250
      },
      partSerial: { // Integer
        bindName: 'PART_SERIAL',
        fieldDisp: 'Serialization',
        fieldPlace: 0,
        fieldDesc: 'Select the serialization type for this part.',
        fieldFilt: /[0-9]{1}$/g,
        fieldLimit: 1
      },
      partManuf: { // Integer, lookup value
        bindName: 'PART_MANUF',
        fieldDisp: 'Manufacturer',
        fieldPlace: 0,
        fieldDesc: 'Select or enter the manufacturer for this part.',
        fieldFilt: /[0-9]{1,4}$/g,
        fieldLimit: 4
      },
      spartStock: { // Integer
        bindName: 'SPART_STOCK',
        fieldDisp: 'Stock',
        fieldPlace: 'Stock',
        fieldDesc: 'Enter the initial quantity for this part.',
        fieldFilt: /[0-9]{1,4}$/g,
        fieldLimit: 4
      }
    },
    poModel: {
      poNum: { // Text
        bindName: 'PO_NUM',
        fieldDisp: 'PO Number',
        fieldPlace: 'PO Number',
        fieldDesc: 'PO number is automatically generated.',
        fieldFilt: /[A-Z]{1}[0-9]{6,9}/g,
        fieldLimit: 10
      },
      poOdate: {
        bindName: 'PO_ODATE',
        fieldDisp: 'Order Date',
        fieldPlace: 'Order Date',
        fieldDesc: 'Select the date when the order was placed.',
        fieldFilt: /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/g,
        fieldLimit: 10
      },
      poCdate: {
        bindName: 'PO_CDATE',
        fieldDisp: 'Completion Date',
        fieldPlace: 'Completion Date',
        fieldDesc: 'Select the date when the order was received.',
        fieldFilt: /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/g,
        fieldLimit: 10
      },
      poCost: {
        bindName: 'PO_COST',
        fieldDisp: 'Cost',
        fieldPlace: 'Cost',
        fieldDesc: 'Enter the total cost for this order.',
        fieldFilt: /[0-9.]{5,9}$/g,
        fieldLimit: 9
      },
      poTax: {
        bindName: 'PO_TAX',
        fieldDisp: 'Tax Cost',
        fieldPlace: 'Cost',
        fieldDesc: 'Enter the tax charged for this order.',
        fieldFilt: /[0-9.]{5,9}$/g,
        fieldLimit: 9
      },
      poShip: {
        bindName: 'PO_SHIP',
        fieldDisp: 'Shipping Cost',
        fieldPlace: 'Cost',
        fieldDesc: 'Enter the shipping charged for this item.',
        fieldFilt: /[0-9.]{5,9}$/g,
        fieldLimit: 9
      },
      poVendor: {
        bindName: 'PO_VENDOR',
        fieldDisp: 'Supplier',
        fieldPlace: 0,
        fieldDesc: 'Select the supplier for this order.',
        fieldFilt: /[0-9]{1,4}$/g,
        fieldLimit: 4
      },
      poStatus: {
        bindName: 'PO_STATUS',
        fieldDisp: 'Status',
        fieldPlace: 0,
        fieldDesc: 'Select the status of this order.',
        fieldFilt: /[0-9]{1}$/g,
        fieldLimit: 1
      },      
      poIcount: {
        bindName: 'PO_ICOUNT',
        fieldDisp: 'Item Count',
        fieldPlace: 'Item Count',
        fieldDesc: 'Enter the quantity of items in this order.',
        fieldFilt: /[0-9]{1,4}$/g,
        fieldLimit: 4
      },
      poiInum: {
        bindName: 'POI_INUM',
        fieldDisp: 'Part Name',
        fieldPlace: 'Part Name',
        fieldDesc: 'Select an existing part or create a new one.',
        fieldFilt: /[a-zA-Z0-9 :,.\-_\/]{8,50}$/g,
        fieldLimit: 50
      },
      poiCount: {
        bindName: 'POI_COUNT',
        fieldDisp: 'Quantity',
        fieldPlace: 'Quantity',
        fieldDesc: 'Enter the quantity of this part in this order.',
        fieldFilt: /[0-9]{1,4}$/g,
        fieldLimit: 4
      },
      poiPerCost: {
        bindName: 'POI_PERCOST',
        fieldDisp: 'Single Cost',
        fieldPlace: 'Cost',
        fieldDesc: 'Enter the cost of this item for this order.',
        fieldFilt: /[0-9.]{5,9}$/g,
        fieldLimit: 9
      }
    },
    catModel: function() {
      var cats = itInvResSvc.getCategories()
      var dfd = $q.defer();
      cats.$promise.then(
        function(res) { dfd.resolve(res); },
        function(res) { dfd.reject(res.data.reason); }
      );
      return dfd.promise;
    },
    manufModel: function() {
      var manufs = itInvResSvc.getManufacturers();
      var dfd = $q.defer();
      manufs.$promise.then(
        function(res) { dfd.resolve(res); },
        function(res) { dfd.reject(res.data.reason); }
      );
      return dfd.promise;
    },
    storeModel: function() {
      var stores = itInvResSvc.getStores();
      var dfd = $q.defer();
      stores.$promise.then(
        function(res) { dfd.resolve(res); },
        function(res) { dfd.reject(res.data.reason); }
      );
      return dfd.promise;
    },
    suplModel: function() {
      var supls = itInvResSvc.getSuppliers();
      var dfd = $q.defer();
      supls.$promise.then(
        function(res) { dfd.resolve(res); },
        function(res) { dfd.reject(res.data.reason); }
      );
      return dfd.promise;
    }
  }
});