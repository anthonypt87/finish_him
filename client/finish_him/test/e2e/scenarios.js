'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('finishHim', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });

	it('should automatically redirect to /users', function() {
		expect(browser().location().url()).toBe('/users');
	});

  describe('users', function() {

    beforeEach(function() {
      browser().navigateTo('#/users');
    });


    it('should render "users" when user navigates to /users', function() {
      expect(element('[ng-view] h2:first').text()).
        toMatch(/Users/);
    });
  });
});
