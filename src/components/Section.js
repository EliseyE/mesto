export class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems(items) {
    this.clear();
    items.slice().reverse().forEach(item => {
      this._renderer(item);
    });
  }

  addItem = function (element) {
    this._container.prepend(element);
  }
}
