'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
	var scope, ctrl, $httpBackend;

	var mock_user_result = {
		'objects': [
			{
				'first_name': 'First',
				'last_name': 'Last',
				'email': 'email@finish_him.com',
				'id': 1
			}
		]
	};

	beforeEach(module('finishHim'));
  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
		$httpBackend = _$httpBackend_;
		$httpBackend.expectGET('api/users').respond(
			mock_user_result
		);

		scope = $rootScope.$new();
		ctrl = $controller('Users', {'$scope' : scope});
	}));


  it('should render users when getting a user from the server', function() {
    expect(scope.users).toEqual([{'first_name': 'First', 'last_name': 'Last'}]);
  });

  it('should ....', inject(function() {
    //spec body
  }));
});
