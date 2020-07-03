const ipc = window.ipc = require('electron').ipcRenderer;

ipc.on('setWindowId', function(event, data) {
  window.windowId = data;
});

ipc.on('injectFileData', function(event, data) {
  window.editor.setText(data);
});
