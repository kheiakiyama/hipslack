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
    $scope.show_messages = false;
    $scope.roomsClick = function() {
      $scope.show_rooms = true;
      $scope.show_messages = false;
    };
    $scope.activeMessages = function(messages) {
      $scope.messages = messages;
      $scope.show_rooms = false;
      $scope.show_messages = true;
    };
  });
