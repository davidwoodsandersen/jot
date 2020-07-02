import Quill from 'quill';

window.editor = new Quill('#editor', {
  theme: 'snow'
});

window.editor.focus();
