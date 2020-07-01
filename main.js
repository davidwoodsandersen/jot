const { app, BrowserWindow, Menu } = require('electron');
const menu = require('./menu');
const store = require('./store');
const actions = require('./actions');

let mainWindow;

function createWindow() {
  mainWindow = actions.createNewFileWindow();
}

function createMenu() {
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createMenu();
  createWindow();
  app.on('activate', function() {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
