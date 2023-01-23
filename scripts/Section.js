export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems = function () {
    this.clear();

    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem = function (element) {
    this._container.prepend(element);
  }

}
