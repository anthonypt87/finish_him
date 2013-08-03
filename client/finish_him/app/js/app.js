'use strict';


// Declare app level module which depends on filters, and services
angular.module('finishHim', ['finishHim.filters', 'finishHim.services', 'finishHim.directives', 'finishHim.controllers']).
  config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/users', {templateUrl: 'partials/users.html', controller: 'MyCtrl1'});
    $routeProvider.otherwise({redirectTo: '/users'});
  }]);
