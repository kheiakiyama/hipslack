'use strict';

/**
 * @ngdoc function
 * @name hipslackApp.controller:DirectmessagesmodalCtrl
 * @description
 * # DirectmessagesmodalCtrl
 * Controller of the hipslackApp
 */
angular.module('hipslackApp')
  .controller('DirectMessagesModalCtrl', function ($scope, $http, config, $modalInstance) {
    var uri = config.backend + '/v2/user?auth_token=' + config.authkey;
    $http.get(uri).success(function(data) {
      $scope.members = data.items;
    });
    $scope.memberClick = function(member) {
      $modalInstance.close(member);
    };
    $scope.closeClick = function() {
      $modalInstance.dismiss('cancel');
    };
  });
