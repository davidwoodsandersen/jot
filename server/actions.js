const path = require('path');
const { BrowserWindow, dialog } = require('electron');
const file = require('./file');
const store = require('./store');

function createWindow() {
  const window = new BrowserWindow({
    width: store.get('windowWidth'),
    height: store.get('windowHeight'),
    webPreferences: {
      preload: path.join(__dirname, '../client/dist/preload.js'),
      nodeIntegration: true
    }
  });
  window.on('resize', () => {
    let { width, height } = window.getBounds();
    store.set('windowWidth', width);
    store.set('windowHeight', height);
  });
  window.loadFile('./client/dist/index.html');
  return window;
}

function createFile() {
  return file.create({
    isNew: true,
    filePath: null,
    window: createWindow()
  });
}

function openFile() {
  let files = dialog.showOpenDialogSync({
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'Jot File', extensions: ['jot'] }
    ]
  });
  if (!files || !files.length) return;
  files = files.map(f => file.create({
    filePath: f,
    window: createWindow()
  }));
}

function saveFile() {
  const currentFile = file.getByWindow(BrowserWindow.getFocusedWindow());
  if (!currentFile) return;
  currentFile.save();
}

module.exports = {
  createWindow,
  createFile,
  openFile,
  saveFile
};
