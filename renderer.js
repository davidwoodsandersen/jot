const ipcRenderer = require('electron').ipcRenderer;

ipcRenderer.on('injectFileData', function(event, data) {
  window.editor.setText(data);
});
