'use strict';

/**
 * @ngdoc service
 * @name hipslackApp.Messages
 * @description
 * # Messages
 * Service in the hipslackApp.
 */
angular.module('hipslackApp')
  .service('Messages', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var self = this;
    this.messages = [];
    this.set = function(messages, callback) {
      var items = {};
      messages.forEach(function(val) {
        var key = self._getDateKey(val.date);
        var date = self._getDate(val.date);
        if (!items[key]) {
          items[key] = {
            "date": date,
            "items": []
          };
        }
        items[key].items.push({ 
          from: val.from.name ? val.from.name : val.from, 
          date: self._formatDate(val.date), 
          message: self._formatMessage(val.message)
        });
      });
      this.messages = items;
      callback.call(this);
    };
    this._formatDate = function(date) {
      var tmp = new Date(date);
      var hours = tmp.getHours();
      var minutes = tmp.getMinutes();
      return ('00' + hours).slice(-2) + ':' + ('00' + minutes).slice(-2);
    };
    this._getDateKey = function(date) {
      var tmp = new Date(date);
      var year = tmp.getYear();
      var month = tmp.getMonth() + 1;
      var day = tmp.getDate();
      return ('00' + year).slice(-2) + ('00' + month).slice(-2) + ('00' + day).slice(-2);
    };
    this._getDate = function(date) {
      var tmp = new Date(date);
      var year = tmp.getFullYear();
      var month = tmp.getMonth() + 1;
      var day = tmp.getDate();
      return ('0000' + year).slice(-4) + '/' + ('00' + month).slice(-2) + '/' + ('00' + day).slice(-2);
    };
    this._formatMessage = function(message) {
      return message.replace(/[\n\r]/g, "<br>");
    };
  });
