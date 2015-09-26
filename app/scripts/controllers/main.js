'use strict';

/**
 * @ngdoc function
 * @name hipslackApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hipslackApp
 */
angular.module('hipslackApp')
  .controller('MainCtrl', function ($scope, $http, config, Messages, Rooms) {
    $scope.show_rooms = false;
    $scope.show_messages = false;
    $scope.openedRooms = [];
    $scope.roomsClick = function() {
      $scope.show_rooms = true;
      $scope.show_messages = false;
    };
    $scope.openRoom = function(room) {
      Rooms.open(room, function() {
        $scope.messages = Messages.messages;
        $scope.show_rooms = false;
        $scope.show_messages = true;
        $scope.openedRooms = Rooms.openedItems;
      });
    };
    $scope.closeRoom = function(room) {
      Rooms.close(room);
      $scope.openedRooms = Rooms.openedItems;
    };
  });
