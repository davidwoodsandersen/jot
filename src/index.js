import Quill from 'quill';

const editor = window.editor = new Quill('#editor', {
  theme: 'snow'
});

editor.on('text-change', function(delta, oldDelta, source) {
  if (!!window.ipc && typeof window.windowId === 'number') {
    window.ipc.send('text-change', window.windowId, {
      content: editor.getText()
    });
  }
});

window.editor.focus();
