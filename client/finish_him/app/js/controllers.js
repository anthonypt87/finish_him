'use strict';

/* Controllers */

angular.module('finishHim.controllers', ['ngResource']).
  controller('Users', ['$scope', '$resource', function($scope, $resource) {
    var Users = $resource('api/user');
    var users = Users.get(function() {
      $scope.users = users['objects'];
    });
  }]).
  controller('User', ['$scope', '$resource', '$routeParams', function($scope, $resource, $routeParams) {
    var User = $resource('api/user/1');
    var user = User.get(function() {
      $scope.user = user;
    });
  }]);
