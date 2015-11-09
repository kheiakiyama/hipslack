'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var dialog = require('dialog');
var conf = require('./lib/config');

require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', function() {

  if (conf.getConfig() === null) {
    dialog.showMessageBox({ 
      title: 'info' ,
      message: 'config file is not found',
      detail: 'about config file: https://github.com/kheiakiyama/hipslack',
      buttons: [ 'OK' ]
    });
    app.quit();
  }

  // ブラウザ(Chromium)の起動, 初期画面のロード
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  installMenu();
  
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

function installMenu() {
  var menu = null;
  var Menu = require('menu');
  if(process.platform == 'darwin') {
    menu = Menu.buildFromTemplate([
      {
        label: 'Electron',
        submenu: [
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            click: function() { app.quit(); }
          },
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            label: 'Reload',
            accelerator: 'Command+R',
            click: function() { mainWindow.restart(); }
          },
          {
            label: 'Toggle Full Screen',
            accelerator: 'Ctrl+Command+F',
            click: function() { mainWindow.setFullScreen(!mainWindow.isFullScreen()); }
          },
          {
            label: 'Toggle Developer Tools',
            accelerator: 'Alt+Command+I',
            click: function() { mainWindow.toggleDevTools(); }
          },
        ]
      }
    ]);
    Menu.setApplicationMenu(menu);
  } else {
    menu = Menu.buildFromTemplate([
      {
        label: '&View',
        submenu: [
          {
            label: '&Reload',
            accelerator: 'Ctrl+R',
            click: function() { mainWindow.restart(); }
          },
          {
            label: 'Toggle &Full Screen',
            accelerator: 'F11',
            click: function() { mainWindow.setFullScreen(!mainWindow.isFullScreen()); }
          },
          {
            label: 'Toggle &Developer Tools',
            accelerator: 'Alt+Ctrl+I',
            click: function() { mainWindow.toggleDevTools(); }
          },
        ]
      }
    ]);
    mainWindow.setMenu(menu);
  }
}