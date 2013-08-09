'use strict';

/* Controllers */

angular.module('finishHim.controllers', ['ngResource']).
  controller('Users', ['$scope', '$resource', function($scope, $resource) {
    var User = $resource('api/user');
    var users = User.get(function() {
      $scope.users = users['objects'];
    });
  }]);
