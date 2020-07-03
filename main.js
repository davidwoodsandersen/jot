const { app, BrowserWindow, Menu } = require('electron');
const menu = require('./menu');
const store = require('./store');
const actions = require('./actions');

let initialFile;

function createFile() {
  initialFile = actions.createFile();
}

function createMenu() {
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createMenu();
  createFile();
  app.on('activate', function() {
    if (BrowserWindow.getAllWindows().length === 0) {
      createFile();
    }
  });
});

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
