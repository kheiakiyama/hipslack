'use strict';

/**
 * @ngdoc function
 * @name hipslackApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hipslackApp
 */
angular.module('hipslackApp')
  .controller('MainCtrl', function ($scope, Messages) {
    $scope.show_rooms = false;
    $scope.show_messages = false;
    $scope.roomsClick = function() {
      $scope.show_rooms = true;
      $scope.show_messages = false;
    };
    $scope.activeMessages = function(messages) {
      Messages.set(messages, function(list) {
        $scope.messages = list;
      });
      $scope.show_rooms = false;
      $scope.show_messages = true;
    };
  });
