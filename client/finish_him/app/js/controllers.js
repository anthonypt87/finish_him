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

    var updateScopeWithBooksForUser = function(user) {
      $scope.books = [];
      var userBooks = user['user_books'];
      for (var i = 0; i < userBooks.length; i++) {
        var userBook = userBooks[i];
        console.log(userBook);
        var Book = $resource('api/book/{0}'.format(userBook['book_id']));
        var book = Book.get(function() {
          $scope.books.push(book);
        });
      }
    };

    var User = $resource('api/user/{0}'.format($routeParams.user_id));
    var user = User.get(function() {
      $scope.user = user;
      updateScopeWithBooksForUser(user);
    });

  }]);
