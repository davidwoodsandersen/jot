const fs = require('fs');
const { dialog, ipcMain } = require('electron');
const actions = require('./actions');

class File {
  constructor(opts) {
    this.window = opts.window;
    this.webContents = this.window.webContents;
    this.id = this.webContents.id;
    this.filePath = opts.filePath || null;
    this.data = opts.data || { content: '', words: 0 };
    this.syncData();
  }

  syncData() {
    this.webContents.on('did-finish-load', () => {
      this.webContents.send('setWindowId', this.id);
      this.webContents.send('injectFileData', this.data);
    });
  }

  save() {
    if (!this.filePath) {
      this.filePath = dialog.showSaveDialogSync({
        filters: [
          { name: 'Jot File', extensions: ['jot'] }
        ]
      });
    }
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.data));
    } catch (e) {
      dialog.showMessageBoxSync({
        type: 'error',
        message: `There was a problem saving ${opts.filePath}. The file may be corrupted.`
      });
    }
  }
}

function create(opts) {
  if (opts.isNew) {
    let file = new File(opts);
    openFiles[file.id] = file;
    return file;
  }
  try {
    const data = JSON.parse(fs.readFileSync(opts.filePath));
    let file = new File({
      ...opts,
      data: data
    });
    openFiles[file.id] = file;
    return file;
  } catch (e) {
    dialog.showMessageBoxSync({
      type: 'error',
      message: `There was a problem opening ${opts.filePath}. The file may be corrupted.`
    });
  }
  return null;
}

const openFiles = {};

function getByWindow(window) {
  return openFiles[window.webContents.id];
}

function getById(id) {
  return openFiles[id];
}

ipcMain.on('text-change', (event, id, data) => {
  openFiles[id].data = data;
});

module.exports = {
  create,
  getByWindow,
  getById
};
