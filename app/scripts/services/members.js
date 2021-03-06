'use strict';

/**
 * @ngdoc service
 * @name hipslackApp.Members
 * @description
 * # Members
 * Service in the hipslackApp.
 */
angular.module('hipslackApp')
  .service('Members', function (config, $http, $rootScope, Messages) {
    var self = this;
    self.openedItems = [];
    this.open = function(member, callback) {
      self._getMessages(member, callback);
      self.setActive(member);
    };
    this.close = function(member) {
      var index = self._indexOf(member.id);
      if (index === -1) {
        return;
      }
      self.openedItems.splice(index, 1);
    };
    this._indexOf = function(id) {
      var res = -1,
          index = 0;
      self.openedItems.forEach(function(element) {
        if (element.id === id) {
          res = index;
        }
        index++;
      });
      return res;
    };
    this._getMessages = function(member, callback) {
      var historyUri = config.backend + '/v2/user/' + member.id + '/history?auth_token=' + config.authkey;
      if (self._indexOf(member.id) === -1) {
        self.openedItems.push(member);
      }
      $http.get(historyUri).success(function(data) {
        Messages.set(data.items, function() {
          callback(this);
        });
      });
    };
    this.setActive = function(member) {
      self.openedItems.forEach(function(element) {
        element.active = false;
      });
      if (member === null) {
        return;
      }
      var index = self._indexOf(member.id);
      if (index === -1) {
        return;
      }
      self.openedItems[index].active = true;
    };
    this.getActiveId = function() {
      var id = -1;
      self.openedItems.forEach(function(element) {
        if (element.active) {
          id = element.id;
        }
      });
      return id;
    };
  });
