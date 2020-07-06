import Editor from 'quill';
import Dashboard from './dashboard';

export default class File {
  constructor() {
    this.data = {
      content: '',
      words: 0,
      target: 500
    };
    this.initDashboard();
    this.initEditor();
  }

  initDashboard() {
    this.dashboard = new Dashboard(this);
  }

  initEditor() {
    this.editor = new Editor('#editor', {
      theme: 'snow',
      modules: { toolbar: false }
    });
    this.editor.on('text-change', this.handleTextChange.bind(this));
    this.editor.focus();
  }

  handleTextChange() {
    const text = this.editor.getText();
    const words = text
      .replace('\n', '')
      .split(' ')
      .filter(w => !!w)
      .length;
    this.setContent(text);
    this.setWords(words);
    this.dashboard.update();
    this.sendUpdate();
  }

  sendUpdate() {
    if (!!window.ipc && typeof window.windowId === 'number') {
      window.ipc.send('data-change', window.windowId, this.data);
    }
  }

  setContent(content, updateEditor) {
    this.data.content = content;
    if (updateEditor) this.editor.setText(content);
  }

  setWords(words, updateDashboard) {
    this.data.words = words;
    if (updateDashboard) this.dashboard.update();
  }

  setTarget(target, updateField) {
    this.data.target = target;
    this.dashboard.update(true);
    this.sendUpdate();
  }
};
