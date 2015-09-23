'use strict';

/**
 * @ngdoc function
 * @name hipslackApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hipslackApp
 */
angular.module('hipslackApp')
  .controller('MainCtrl', function ($scope) {
    $scope.show_rooms = false;
    $scope.roomsClick = function() {
      $scope.show_rooms = true;
    };
  });
