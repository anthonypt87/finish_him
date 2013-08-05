'use strict';

/* Controllers */

angular.module('finishHim.controllers', []).
  controller('Users', ['$scope', function($scope) {
		$scope.users = [{'first_name': 'First', 'last_name': 'Last'}];
  }]);
