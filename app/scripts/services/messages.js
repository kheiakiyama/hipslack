'use strict';

/**
 * @ngdoc service
 * @name hipslackApp.Messages
 * @description
 * # Messages
 * Service in the hipslackApp.
 */
angular.module('hipslackApp')
  .service('Messages', function ($rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var self = this;
    this.messages = [];
    this.set = function(messages, callback) {
      var items = [];
      messages.forEach(function(val, index) {
        var date = self._formatDate(val.date);
        items.push({ 
          from: val.from.name ? val.from.name : val.from, 
          date: date, 
          message: self._formatMessage(val.message)
        });
      });
      this.messages = items;
      callback.call(this, this.messages);
    };
    this._formatDate = function(date) {
      var tmp = new Date(date);
      var hours = tmp.getHours();
      var minutes = tmp.getMinutes();
      return ('00' + hours).slice(-2) + ':' + ('00' + minutes).slice(-2);
    };
    this._formatMessage = function(message) {
      return message;
    };
  });
