'use strict';


// Declare app level module which depends on filters, and services
angular.module('finishHim', ['finishHim.filters', 'finishHim.services', 'finishHim.directives', 'finishHim.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/users', {templateUrl: 'partials/users.html', controller: 'UsersCtrl'});
    $routeProvider.when('/user/:user_id', {templateUrl: 'partials/user.html', controller: 'UserCtrl'});
    $routeProvider.otherwise({redirectTo: '/users'});
  }]);
