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
  .module('hipslackApp', ['hipslackApp.config', 'ngSanitize', 'ui.bootstrap']);

var remote = require('remote');
var config = remote.require('./lib/config');

var setting = config.getConfig();

angular
  .module('hipslackApp.config', [])
  .constant('config', {
    'backend': 'https://api.hipchat.com',
    'authkey': setting.key
  });