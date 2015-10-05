'use strict';

/**
 * @ngdoc function
 * @name hipslackApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hipslackApp
 */
angular.module('hipslackApp')
  .controller('MainCtrl', function ($scope, $http, $modal, Messages, Rooms, Members) {
    $scope.openedRooms = [];
    $scope.roomsClick = function() {
      var roomsModal = $modal.open({
        animation: true,
        size: 'lg',
        templateUrl: 'roomsModal.html',
        controller: 'RoomsModalCtrl'
      });
      roomsModal.result.then(function (selectedItem){
        $scope._openRoom(selectedItem);
      });
    };
    $scope.roomClick = function(room) {
      $scope._openRoom(room);
    };
    $scope._openRoom = function(room) {
      Rooms.open(room, function() {
        Members.setActive(null);
        $scope.activeRoomProperty = Rooms.activeRoomProperty;
        $scope._update();
      });
    };
    $scope.membersClick = function() {
      var directMessagesModal = $modal.open({
        animation: true,
        size: 'lg',
        templateUrl: 'directMessagesModal.html',
        controller: 'DirectMessagesModalCtrl'
      });
      directMessagesModal.result.then(function (selectedItem){
        $scope._openMember(selectedItem);
      });
    };
    $scope.memberClick = function(member) {
      $scope._openMember(member);
    };
    $scope._openMember = function(member) {
      Members.open(member, function() {
        Rooms.setActive(null);
        $scope.activeRoomProperty = null;
        $scope._update();
      });
    };
    $scope._update = function() {
      $scope.groupMessages = Messages.messages;
      $scope.openedRooms = Rooms.openedItems;
      $scope.openedMembers = Members.openedItems;
    };
    $scope.closeRoom = function(room) {
      Rooms.close(room);
      $scope.openedRooms = Rooms.openedItems;
    };
  });
