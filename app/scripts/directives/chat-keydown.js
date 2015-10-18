'use strict';

/**
 * @ngdoc directive
 * @name hipslackApp.directive:myChatKeyDown
 * @description
 * # myChatKeyDown
 */
angular.module('hipslackApp')
  .directive('myChatKeyDown', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (e) {
            if (e.which === 13 &&
                !e.shiftKey) {
                scope.$apply(function (){
                    scope.$eval(attrs.myChatKeyDown);
                });
                return false;
            }
        });
    };
  });
