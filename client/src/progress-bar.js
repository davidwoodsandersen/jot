export default class ProgressBar {
  constructor(words, target) {
    this.el = document.createElement('style');
    document.head.appendChild(this.el);
    if (words && target) this.update(words, target);
  }

  update(words, target) {
    const percentage = Math.floor((words / target) * 100).toFixed(0);
    this.el.textContent = `#word-count:before { width: ${percentage}% !important; }`;
  }
};
