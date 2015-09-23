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
    this.messages = [];
    this.set = function(messages, callback) {
      this.messages = messages;
      callback.call(this, this.messages);
    };
  });
