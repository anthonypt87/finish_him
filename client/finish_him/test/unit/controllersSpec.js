'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  var scope, ctrl, $httpBackend;
  var mock_user = {
    'first_name': 'First',
    'last_name': 'Last',
    'email': 'email@finish_him.com',
    'id': 1
  };

  var mock_user_result = {
    'objects': [
        mock_user
    ]
  };

  beforeEach(module('finishHim'));
  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('api/user').respond(
      mock_user_result
    );

    scope = $rootScope.$new();
    ctrl = $controller('Users', {'$scope' : scope});
    $httpBackend.flush();
  }));


  it('should render users when getting a user from the server', function() {
    expect(scope.users).toEqual([mock_user]);
  });
});
