import Quill from 'quill';

class Dashboard {
  constructor() {
    this.container = document.getElementById('stats');
  }

  update(wordCount) {
    this.container.textContent = `Word count: ${wordCount}`;
  }
}

class File {
  constructor() {
    this.data = {
      content: '',
      words: 0
    };
    this.dashboard = new Dashboard();
    this.editor = new Quill('#editor', {
      theme: 'snow',
      modules: { toolbar: false }
    });
    this.editor.on('text-change', () => {
      const text = this.editor.getText();
      const words = text.replace('\n', '').split(' ').filter(w => !!w).length;
      this.setContent(text);
      this.setWords(words);
      this.dashboard.update(words);
      if (!!window.ipc && typeof window.windowId === 'number') {
        window.ipc.send('text-change', window.windowId, this.data);
      }
    });
    this.editor.focus();
  }

  setContent(content, updateEditor) {
    this.data.content = content;
    if (updateEditor) this.editor.setText(content);
  }

  setWords(words, updateDashboard) {
    this.data.words = words;
    if (updateDashboard) this.dashboard.update(this.data.words);
  }
}

const file = window.file = new File();
