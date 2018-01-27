angular.module('it', ['ngResource', 'ngRoute', 'ngSanitize', 'ngAnimate', 'ui.select', 'angular.filter']);

angular.module('it').run(function($rootScope, $location, itIdentitySvc) {
  $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
    if(rejection === '403') { console.log('403'); $location.path('/login'); }
  });
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    if(!itIdentitySvc.isAuthenticated()) $location.path('/login');
  })
});

angular.module('it').config(function($routeProvider, $locationProvider, $httpProvider) {
  var roleChecks = {
    admin: { auth: /*@ngInject*/ function(itAuthSvc) { return itAuthSvc.authorizeCurrentUserForRoute('admin'); } },
    user: { auth: /*@ngInject*/ function(itAuthSvc) { return itAuthSvc.routeAsAuthenticatedUser(); } },
    guest: { auth: /*@ngInject*/ function(itAuthSvc) { return itAuthSvc.routeAsGuest(); } }
  }

  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/', {
      templateUrl: '/partials/dash/view/dashboard',
      // controller: 'itDashCtrl',
      resolve: roleChecks.user
    })
    .when('/login', {
      templateUrl: '/partials/auth/view/login',
      controller: 'itLoginCtrl',
      resolve: roleChecks.guest
    })
    .when('/admin', {
      templateUrl: '/partials/admin/view/admin',
      resolve: roleChecks.admin
    })
    .when('/apps/home', {
      templateUrl: '/partials/apps/view/apps',
      resolve: roleChecks.user
    })
    .when('/apps/teapot', {
      templateUrl: '/partials/apps/teapot/view/teapot',
      controller: 'itTeapotCtrl',
      resolve: roleChecks.admin
    })
    .when('/it/home', {
      templateUrl: '/partials/it/view/it',
      resolve: roleChecks.user
    })
    .when('/it/inventory', {
      templateUrl: '/partials/it/inv/view/parts/inventory',
      controller: 'itInvCtrl',
      resolve: roleChecks.user
    })
    .when('/it/inventory/parts/:part', {
      templateUrl: '/partials/it/inv/view/parts/partview',
      controller: 'itInvCtrl',
      resolve: roleChecks.user
    })
    .when('/it/inventory/parts/:part/serials', {
      templateUrl: '/partials/it/inv/view/parts/serials',
      controller: 'itInvCtrl',
      resolve: roleChecks.user
    })
    .when('/it/inventory/parts/:part/history', {
      templateUrl: '/partials/it/inv/view/parts/history',
      controller: 'itInvCtrl',
      resolve: roleChecks.user
    })
    .when('/it/inventory/parts/admin', {
      templateUrl: '/partials/it/inv/view/parts/partadmin',
      controller: 'itInvAdminCtrl',
      resolve: roleChecks.admin
    })
    .when('/it/inventory/po', {
      templateUrl: '/partials/it/inv/view/po/po',
      controller: 'itInvPOCtrl',
      resolve: roleChecks.admin
    })
    .when('/it/inventory/po/new', {
      templateUrl: '/partials/it/inv/view/po/create',
      controller: 'itInvPOCtrl',
      resolve: roleChecks.admin
    })
    .when('/it/inventory/po/complete', {
      templateUrl: '/partials/it/inv/view/po/complete',
      controller: 'itInvPOCtrl',
      resolve: roleChecks.admin
    })
    .when('/it/inventory/po/:po', {
      templateUrl: '/partials/it/inv/view/po/poview',
      controller: 'itInvPOCtrl',
      resolve: roleChecks.admin
    })
    .otherwise({
      redirectTo: '/'
    })
});