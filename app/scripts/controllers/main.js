'use strict';

/**
 * @ngdoc function
 * @name hipslackApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hipslackApp
 */
angular.module('hipslackApp')
  .controller('MainCtrl', function ($scope, $http, $modal, Messages, Rooms) {
    $scope.show_messages = false;
    $scope.openedRooms = [];
    $scope.roomsClick = function() {
      var roomsModal = $modal.open({
        animation: true,
        size: 'lg',
        templateUrl: 'roomsModal.html',
        controller: 'RoomsModalCtrl'
      });
      roomsModal.result.then(function (selectedItem){
        $scope.openRoom(selectedItem);
      });
    };    
    $scope.menbersClick = function() {
      $scope.show_rooms = false;
      $scope.show_messages = false;
      $scope.show_menbers = true;
    };
    $scope.openRoom = function(room) {
      Rooms.open(room, function() {
        $scope.messages = Messages.messages;
        $scope.show_rooms = false;
        $scope.show_messages = true;
        $scope.show_menbers = false;
        $scope.openedRooms = Rooms.openedItems;
      });
    };
    $scope.closeRoom = function(room) {
      Rooms.close(room);
      $scope.openedRooms = Rooms.openedItems;
    };
  });
