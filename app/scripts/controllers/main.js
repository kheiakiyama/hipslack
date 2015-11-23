'use strict';

var shell = require('shell');
var remote = require('remote');
var appConfig = remote.require('./lib/app-config');

/**
 * @ngdoc function
 * @name hipslackApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hipslackApp
 */
angular.module('hipslackApp')
  .controller('MainCtrl', function ($scope, $http, $modal, $location, $sce, config, Messages, Rooms, Members) {
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
        $scope.roomClick(selectedItem);
      });
    };
    $scope.roomClick = function(room) {
      $scope._loadRoom(room, function() {
        $scope._saveStates();
      });
    };
    $scope._loadRoom = function(room, callback) {
      $scope.isLoading = true;
      $scope._activeMessageParam = room;
      Rooms.open(room, function() {
        Members.setActive(null);
        $scope.activeRoomProperty = Rooms.activeRoomProperty;
        $scope._update();
        if (callback !== undefined) {
          callback();
        }
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
        $scope.memberClick(selectedItem);
      });
    };
    $scope.memberClick = function(member) {
      $scope._loadMember(member, function() {
        $scope._saveStates();
      });
    };
    $scope._loadMember = function(member, callback) {
      $scope.isLoading = true;
      $scope._activeMessageParam = member;
      Members.open(member, function() {
        Rooms.setActive(null);
        $scope.activeRoomProperty = null;
        $scope._update();
        if (callback !== undefined) {
          callback();
        }
      });
    };
    $scope._redraw = function() {
      if ($scope._activeMessageParam === null) {
        return;
      }
      if ($scope.activeRoomProperty) {
        $scope._loadRoom($scope._activeMessageParam);
      } else {
        $scope._loadMember($scope._activeMessageParam);
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
    $scope.closeMember = function(member) {
      Members.close(member);
      $scope.openedMembers = Members.openedItems;
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
      }).success(function() {
        $scope.inputText = "";
        $scope._redraw();
      });
    };
    $scope.messageBoxKeyDown = function() {
      $scope.sendMessageClick();
    };
    $scope.linkClick = function(url) {
      shell.openExternal(url);
      return false;
    };
    $scope.toTrusted = function(htmlCode) {
      return $sce.trustAsHtml(htmlCode);
    };
    $scope._saveStates = function() {
      appConfig.save({
        rooms: $scope.openedRooms,
        members: $scope.openedMembers,
        isRoom: $scope.activeRoomProperty,
        active: $scope._activeMessageParam
      });
    };
    $scope._loadStates = function() {
      appConfig.load(function(config) {
        Rooms.openedItems = config.rooms;
        Members.openedItems = config.members;
        if (config.isRoom) {
          $scope._loadRoom(config.active);
        } else {
          $scope._loadMember(config.active);
        }
      });
    };
    $scope._redrawHookEvent = function() {
      $scope._redraw();
      setTimeout($scope._redrawHookEvent, 30000);
    };
    $scope._redrawHookEvent();
    $scope._loadStates();
  });
