export default class Dashboard {
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
};
