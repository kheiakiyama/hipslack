'use strict';

/**
 * @ngdoc directive
 * @name hipslackApp.directive:myCompile
 * @description
 * # myCompile
 */
angular.module('hipslackApp')
  .directive('myCompile', function ($compile) {
    return function (scope, element, attrs) {
      element.html(scope.$eval(attrs.myCompile));
      $compile(element.contents())(scope);
    };
  });
