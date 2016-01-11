var app = require('app');
var Hipchatter = require('hipchatter');
var userConfig = require('./config');

var _config = null;
var HipchatFactory = {
  GetClient: function () {
    if (!_config) {
      _config = userConfig.getConfig();
      console.log(_config);
    }
    return new Hipchatter(_config.key);
  }
};

module.exports = HipchatFactory;