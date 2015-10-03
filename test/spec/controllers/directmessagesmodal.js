'use strict';

describe('Controller: DirectmessagesmodalCtrl', function () {

  // load the controller's module
  beforeEach(module('hipslackApp'));

  var DirectmessagesmodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DirectmessagesmodalCtrl = $controller('DirectmessagesmodalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DirectmessagesmodalCtrl.awesomeThings.length).toBe(3);
  });
});
