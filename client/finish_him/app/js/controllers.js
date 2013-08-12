'use strict';

/* Controllers */

angular.module('finishHim.controllers', ['ngResource']).
  controller('UsersCtrl', ['$scope', '$resource', function($scope, $resource) {
    var Users = $resource('api/user');
    var users = Users.get(function() {
      $scope.users = users['objects'];
    });
  }]).
  controller('UserCtrl', ['$scope', '$resource', '$routeParams', function($scope, $resource, $routeParams) {
    var User = $resource('api/user/{0}'.format($routeParams.user_id));
    var user = User.get(function() {
      $scope.user = user;
    });
  }]);
