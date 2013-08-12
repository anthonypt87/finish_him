'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('finishHim', function() {

  beforeEach(function() {
    browser().navigateTo('index-test.html');
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
      expect(repeater('li').count()).toEqual(15);
    });
  });

  describe('user', function() {

    beforeEach(function() {
      browser().navigateTo('#/user/1');
    });
    it('should render the users information and books', function() {
      expect(element('[ng-view] .user_info').text()).
        toMatch(/First Last/);
      expect(repeater('.book_info').count()).toEqual(1);
    });
  });
});
