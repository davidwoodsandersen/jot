import ProgressBar from './progress-bar';

export default class Dashboard {
  constructor(file) {
    this.file = file;
    this.initDomElements();
    this.progressBar = new ProgressBar(
      this.file.data.words,
      this.file.data.target
    );
  }

  initDomElements() {
    this.els = {
      wordsWritten: document.getElementById('words-written'),
      wordsTarget: document.getElementById('words-target')
    };
    this.els.wordsTarget.value = this.file.data.target;
    this.els.wordsTarget.addEventListener('change', (e) => {
      this.file.setTarget(Number(e.target.value));
    });
  }

  setWordCount(words) {
    this.els.wordsWritten.textContent = `${words}/`;
  }

  update(setTarget) {
    if (setTarget) {
      this.els.wordsTarget.value = this.file.data.target;
    }
    this.setWordCount(this.file.data.words);
    this.progressBar.update(
      this.file.data.words,
      this.file.data.target
    );
  }
};
