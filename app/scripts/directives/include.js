'use strict';

/**
 * @ngdoc directive
 * @name hipslackApp.directive:myInclude
 * @description
 * # myInclude
 */
angular.module('hipslackApp')
  .directive('myInclude', function($http, $compile) {
    return function(scope, element, attr) {
      $http.get(attr.myInclude).success(function(response) {
        element.html(response);
        $compile(element.contents())(scope);
      })
    };
});