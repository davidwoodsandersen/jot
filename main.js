const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const menu = require('./menu');
const Store = require('./store');

let mainWindow;

const store = new Store({
  configName: 'user-preferences',
  defaults: {
    windowWidth: 1000,
    windowHeight: 800
  }
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: store.get('windowWidth'),
    height: store.get('windowHeight'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  mainWindow.on('resize', () => {
    let { width, height } = mainWindow.getBounds();
    store.set('windowWidth', width);
    store.set('windowHeight', height);
  });
  mainWindow.loadFile('index.html');
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
