const path = require('path');
const { BrowserWindow } = require('electron');
const store = require('./store');

module.exports = {
  createNewFileWindow: () => {
    const window = new BrowserWindow({
      width: store.get('windowWidth'),
      height: store.get('windowHeight'),
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
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
};
