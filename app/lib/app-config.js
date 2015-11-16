'use strict';

var app = require('app');
var fs = require('fs');

var appConfig = {
  load: function (success) {
    var filename = appConfig._getFilename();
    if (fs.existsSync(filename)) { 
      success(require(filename));
    } else {
      return null;
    }
  },
  save: function (config) {
    var filename = appConfig._getFilename();
    var converted = appConfig._convert(config); 
    fs.writeFile(filename, JSON.stringify(converted, null, 4), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to " + filename);
      }
    }); 
  },
  _convert: function(config) {
    var getItem = function(setting) {
      return {
        id: setting.id,
        name: setting.name
      };
    };
    var getItems = function(settings) {
      var items = [];
      settings.forEach(function(element) {
        items.push(getItem(element));
      }, this);
      return items;
    };
    return {
        rooms: getItems(config.rooms),
        members: getItems(config.members),
        isRoom: config.isRoom ? true : false,
        active: getItem(config.active)
      };
  },
  _getFilename: function() {
    return app.getPath('userData') + '/appConfig.json';
  }
};

module.exports = appConfig;