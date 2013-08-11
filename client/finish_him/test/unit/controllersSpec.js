'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  var scope, ctrl, $httpBackend;
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

  beforeEach(module('finishHim'));
  beforeEach(function(){
    this.addMatchers({
      'toEqualData': function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  function construct_controller(controllerName, httpBackendMockerFunction) {
    return inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      httpBackendMockerFunction($httpBackend);
      scope = $rootScope.$new();
      ctrl = $controller(controllerName, {'$scope' : scope});
      $httpBackend.flush();
    });
  }

  describe('Users', function(){
    beforeEach(construct_controller('Users', function(_$httpBackend_){
      _$httpBackend_.expectGET('api/user').respond(
        mock_users
      );
    }));
    it('should render users when getting a user from the server', function() {
      expect(scope.users).toEqualData([mock_user]);
    });
  });

  describe('User', function(){
    beforeEach(construct_controller('User', function(_$httpBackend_){
      _$httpBackend_.expectGET('api/user/1').respond(
        mock_user
      );
    }));
    it('should render user with books', function() {
      expect(scope.user).toEqualData(mock_user);
    });
  });
});
