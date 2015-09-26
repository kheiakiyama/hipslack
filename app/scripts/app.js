'use strict';

/**
 * @ngdoc overview
 * @name hipslackApp
 * @description
 * # hipslackApp
 *
 * Main module of the application.
 */
angular
  .module('hipslackApp', ['hipslackApp.config', 'ngSanitize']);

angular
  .module('hipslackApp.config', [])
  .constant('config', {
    'backend': 'https://api.hipchat.com',
    'authkey': 'xxx'
  });