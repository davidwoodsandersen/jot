const fs = require('fs');
const { dialog } = require('electron');
const actions = require('./actions');

class File {
  constructor(opts) {
    this.window = opts.window;
    this.filePath = opts.filePath || null;
    this.data = opts.data;
    this.setData();
  }

  setData() {
    const wc = this.window.webContents;
    wc.on('did-finish-load', () => {
      wc.send('injectFileData', JSON.stringify(this.data));
    });
  }
}

module.exports = {
  create: (opts) => {
    if (opts.isNew) return new File(opts);
    try {
      const data = JSON.parse(fs.readFileSync(opts.filePath));
      return new File({
        ...opts,
        data: data
    });
    } catch (e) {
      dialog.showMessageBoxSync({
        type: 'error',
        message: `There was a problem opening ${opts.filePath}. The file may be corrupted.`
      });
    }
    return null;
  }
};
