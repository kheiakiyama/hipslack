'use strict';

/**
 * @ngdoc function
 * @name hipslackApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hipslackApp
 */
angular.module('hipslackApp')
  .controller('MainCtrl', function ($scope, $http, $modal, $location, config, Messages, Rooms, Members) {
    $scope.openedRooms = [];
    $scope.isLoading = false;
    $scope._activeMessageParam = null;
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
      $scope.isLoading = true;
      $scope._activeMessageParam = room;
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
      $scope.isLoading = true;
      $scope._activeMessageParam = member;
      Members.open(member, function() {
        Rooms.setActive(null);
        $scope.activeRoomProperty = null;
        $scope._update();
      });
    };
    $scope._redraw = function() {
      if ($scope._activeMessageParam === null)
        return;
      if ($scope.activeRoomProperty) {
        $scope._openRoom($scope._activeMessageParam);
      } else {
        $scope._openMember($scope._activeMessageParam);
      }
    };    
    $scope._update = function() {
      $scope.groupMessages = Messages.messages;
      $scope.openedRooms = Rooms.openedItems;
      $scope.openedMembers = Members.openedItems;
      var last = Messages.getLast();
      if (last) {
        $location.hash('message-' + last.id);
      }
      $scope.isLoading = false;
    };
    $scope.closeRoom = function(room) {
      Rooms.close(room);
      $scope.openedRooms = Rooms.openedItems;
    };
    $scope.sendMessageClick = function() {
      var getUrl = function () {
        if ($scope.activeRoomProperty) {
          var roomId = Rooms.getActiveId();
          return config.backend + '/v2/room/' + roomId +  '/message';
        } else {
          var roomId2 = Members.getActiveId();
          return config.backend + '/v2/user/' + roomId2 +  '/message';
        }
      };
      var uri = getUrl();
      $http({
        method: 'POST',
        url: uri, 
        data: { message: $scope.inputText }, 
        headers: { 'Authorization': 'Bearer ' + config.authkey }
      }).success(function(data) {
        $scope.inputText = "";
        $scope._redraw();
      });
    };
    $scope.messageBoxKeyDown = function() {
      $scope.sendMessageClick();
    };
    $scope._redrawHookEvent = function() {
      $scope._redraw();
      setTimeout($scope._redrawHookEvent, 30000);
    };
    $scope._redrawHookEvent();
  });
