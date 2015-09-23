'use strict';

/**
 * @ngdoc function
 * @name hipslackApp.controller:RoomsCtrl
 * @description
 * # RoomsCtrl
 * Controller of the hipslackApp
 */
angular.module('hipslackApp')
  .controller('RoomsCtrl', function ($scope, $http, config) {
    var uri = config.backend + '/v2/room?auth_token=' + config.authkey;
    $http.get(uri).success(function(data) {
      $scope.rooms = data.items;
    });
  });
