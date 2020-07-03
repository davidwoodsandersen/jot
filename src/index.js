import Quill from 'quill';

window.editor = new Quill('#editor', {
  theme: 'snow'
});

window.editor.on('text-change', function(delta, oldDelta, source) {
  if (!!window.ipc && typeof window.windowId === 'number') {
    window.ipc.send('text-change', window.windowId, window.editor.getText());
  }
});

window.editor.focus();
