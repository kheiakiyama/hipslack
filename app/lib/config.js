'use strict';

var app = require('app');
var path = require('path');
var fs = require('fs');

var config = {
  getConfig: function () {
    var filename = app.getPath('userData') + '/config.json';
    if (fs.existsSync('foo.txt')) { 
      return require(filename);
    } else {
      return {
        key: ''
      };
    }
  }
};

module.exports = config;