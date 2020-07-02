const path = require('path');
const { BrowserWindow, dialog } = require('electron');
const file = require('./file');
const store = require('./store');

function createNewFileWindow() {
  const window = new BrowserWindow({
    width: store.get('windowWidth'),
    height: store.get('windowHeight'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  });
  window.on('resize', () => {
    let { width, height } = window.getBounds();
    store.set('windowWidth', width);
    store.set('windowHeight', height);
  })
  window.loadFile('index.html');
  return window;
}

function openFile() {
  let files = dialog.showOpenDialogSync({
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'Text File', extensions: ['jot'] }
    ]
  });
  if (!files || !files.length) return;
  files = files.map(f => file.create({
    filePath: f,
    window: createNewFileWindow()
  }));
}

module.exports = {
  createNewFileWindow,
  openFile
};
