'use strict';

var common = {
  fillArray: function(value, length) {
    var array = [];
    for (var i = 0; i < length; i++) {
      array.push(value);
    }
    return array;
  }
};

angular.module('finishHimTest', ['finishHim', 'ngMockE2E']).run(function($httpBackend) {
  var mock_user = {
    'first_name': 'First',
    'last_name': 'Last',
    'email': 'email@finish_him.com',
    'id': 1
  };
  var mock_users = {
    'objects': common.fillArray(mock_user, 15)
  };
  $httpBackend.whenGET('api/users').respond(mock_users); 
  $httpBackend.whenGET(/partials/).passThrough();
});
