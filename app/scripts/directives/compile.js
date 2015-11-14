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
      scope.$watch(
        function(scope) {
          return scope.$eval(attrs.myCompile);
        },
        function(value) {
          element.html(value);
          $compile(element.contents())(scope);
        }
      );
    };
  });
