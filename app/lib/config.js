'use strict';

var app = require('app');
var fs = require('fs');

var config = {
  getConfig: function () {
    var filename = app.getPath('userData') + '/config.json';
    if (fs.existsSync(filename)) { 
      return require(filename);
    } else {
      return null;
    }
  }
};

module.exports = config;