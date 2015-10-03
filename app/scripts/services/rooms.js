'use strict';

/**
 * @ngdoc service
 * @name hipslackApp.Rooms
 * @description
 * # Rooms
 * Service in the hipslackApp.
 */
angular.module('hipslackApp')
  .service('Rooms', function (config, $http, $rootScope, Messages) {
    var self = this;
    self._activeIndex = -1;
    self._openedIds = [];
    self.openedItems = [];
    this.open = function(room, callback) {
      self._getMessages(room, callback);
      self._getRoomProperty(room, callback);
      self._setActive(room);
    };
    this.close = function(room) {
      var index = self._openedIds.indexOf(room.id);
      if (index === -1) {
        return;
      }
      self._openedIds.splice(index, 1);
      self.openedItems.splice(index, 1);
    };
    this._getMessages = function(room, callback) {
      var historyUri = config.backend + '/v2/room/' + room.id + '/history?auth_token=' + config.authkey;
      if (self._openedIds.indexOf(room.id) === -1) {
        self._openedIds.push(room.id);
        self.openedItems.push(room);
      }
      $http.get(historyUri).success(function(data) {
        Messages.set(data.items, function() {
          callback(this);
        });
      });
    };
    this._getRoomProperty = function(room, callback) {
      var roomInfoUri = config.backend + '/v2/room/' + room.id + '/participant?auth_token=' + config.authkey;
      $http.get(roomInfoUri).success(function(data) {
        self.activeRoomProperty = data;
        callback(this);
      });
    };
    this._setActive = function(room) {
      var index = self._openedIds.indexOf(room.id);
      if (index === -1) {
        return;
      }
      self.openedItems.forEach(function(element) {
        element.active = false;
      });
      self._activeIndex = index;
      self.openedItems[index].active = true;
    };
  });
