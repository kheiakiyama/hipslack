'use strict';

/**
 * @ngdoc overview
 * @name hipslackApp
 * @description
 * # hipslackApp
 *
 * Main module of the application.
 */
var app = angular
  .module('hipslackApp', ['hipslackApp.config', 'ngSanitize', 'ui.bootstrap']);

angular
  .module('hipslackApp.config', [])
  .constant('config', {
    'backend': 'https://api.hipchat.com',
    'authkey': 'xxx'
  });