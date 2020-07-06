const electron = require('electron');
const path = require('path');
const fs = require('fs');

function parseFile(filePath, defaults) {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (e) {
    return defaults;
  }
}

class Store {
  constructor(opts) {
    const configName = opts.configName || 'data';
    const defaults = opts.defaults || {};
    const app = electron.app || electron.remote.app;
    const userDataPath = app.getPath('userData');
    this.path = path.join(userDataPath, configName + '.json');
    this.data = parseFile(this.path, defaults);
  }

  get(key) {
    return this.data[key];
  }

  set(key, val) {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

module.exports = new Store({
  configName: 'user-preferences',
  defaults: {
    windowWidth: 1000,
    windowHeight: 800
  }
});
