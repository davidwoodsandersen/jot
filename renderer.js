const ipc = window.ipc = require('electron').ipcRenderer;

ipc.on('setWindowId', function(event, data) {
  window.windowId = data;
});

ipc.on('injectFileData', function(event, data) {
  window.file.setContent(data.content, true);
  window.file.setWords(data.words, true);
  window.file.setTarget(data.target, true);
});
