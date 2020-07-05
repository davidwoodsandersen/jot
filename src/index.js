import Quill from 'quill';

class Dashboard {
  constructor(file) {
    this.file = file;
    this.wordCount = document.getElementById('current-count');
    this.wordTarget = document.getElementById('target');
    this.wordTarget.value = this.file.data.target;
    this.updatePercentage();

    this.wordTarget.addEventListener('change', (e) => {
      this.file.setTarget(Number(e.target.value));
    });
  }

  updateProgressBar(percentage) {
    if (!this.progressEl) {
      this.progressEl = document.createElement('style');
      document.head.appendChild(this.progressEl);
    }
    this.progressEl.textContent = `#word-count:before { width: ${percentage}% !important; }`
  }

  updatePercentage() {
    const words = this.file.data.words;
    const target = this.file.data.target;
    const percentage = Math.floor((words / target) * 100).toFixed(0);
    this.updateProgressBar(percentage);
  }

  setTarget(target, updateField) {
    this.updatePercentage();
    if (updateField) this.wordTarget.value = target;
  }

  update(wordCount) {
    this.wordCount.textContent = `${wordCount}/`;
  }
}

class File {
  constructor() {
    this.data = {
      content: '',
      words: 0,
      target: 500
    };
    this.dashboard = new Dashboard(this);
    this.editor = new Quill('#editor', {
      theme: 'snow',
      modules: { toolbar: false }
    });
    this.editor.on('text-change', this.handleTextChange.bind(this));
    this.editor.focus();
  }

  handleTextChange() {
    const text = this.editor.getText();
    const words = text.replace('\n', '').split(' ').filter(w => !!w).length;
    this.setContent(text);
    this.setWords(words);
    this.dashboard.update(words);
    this.dashboard.updatePercentage();
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
    if (updateDashboard) this.dashboard.update(this.data.words);
  }

  setTarget(target, updateField) {
    this.data.target = target;
    this.dashboard.setTarget(target, updateField);
    this.sendUpdate();
  }
}

const file = window.file = new File();
