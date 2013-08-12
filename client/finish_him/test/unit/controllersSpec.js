'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  var scope;
  var mock_user = {
    'first_name': 'First',
    'last_name': 'Last',
    'email': 'email@finish_him.com',
    'id': 1,
    'user_books': [{
      'book_id': 2,
      'user_id': 1
    }]
  };

  var mock_users = {
    'objects': [
        mock_user
    ]
  };

  function construct_controller(controllerName, httpBackendMockerFunction, routeParamsMockerFunction) {
    return inject(function($httpBackend, $rootScope, $controller, $routeParams) {
      httpBackendMockerFunction($httpBackend);
      if (routeParamsMockerFunction !== undefined) {
        routeParamsMockerFunction($routeParams);
      }
      scope = $rootScope.$new();
      var ctrl = $controller(controllerName, {'$scope' : scope});
      $httpBackend.flush();
    });
  }

  beforeEach(module('finishHim'));
  beforeEach(function(){
    this.addMatchers({
      'toEqualData': function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  describe('UsersCtrl', function(){
    beforeEach(construct_controller('UsersCtrl', function($httpBackend){
      $httpBackend.expectGET('api/user').respond(
        mock_users
      );
    }));

    it('should render users when getting a user from the server', function() {
      expect(scope.users).toEqualData([mock_user]);
    });
  });

  describe('UserCtrl', function(){
    beforeEach(construct_controller('UserCtrl', 
      function($httpBackend){
        $httpBackend.expectGET('api/user/1').respond(mock_user);
      },
      function($routeParams){
        $routeParams.user_id = 1;
      }
    ));

    it('should render user with books', function() {
      expect(scope.user).toEqualData(mock_user);
    });
  });
});
