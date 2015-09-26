'use strict';

/**
 * @ngdoc function
 * @name hipslackApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hipslackApp
 */
angular.module('hipslackApp')
  .controller('MainCtrl', function ($scope, $http, config, Messages) {
    $scope.show_rooms = false;
    $scope.show_messages = false;
    $scope.activeRooms = [];
    $scope._activeRoomIds = [];
    $scope.roomsClick = function() {
      $scope.show_rooms = true;
      $scope.show_messages = false;
    };
    $scope.openRoom = function(room) {
      var historyUri = config.backend + '/v2/room/' + room.id + '/history?auth_token=' + config.authkey;
      if ($scope._activeRoomIds.indexOf(room.id) == -1) {
        $scope._activeRoomIds.push(room.id);
        $scope.activeRooms.push(room);
      }
      $http.get(historyUri).success(function(data) {
        Messages.set(data.items, function(list) {
          $scope.messages = list;
        });
        $scope.show_rooms = false;
        $scope.show_messages = true;
      });
    };
  });
