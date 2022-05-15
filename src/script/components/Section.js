export default class Section {
  constructor({renderer}, containerSelector) {
    this._rendered = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(array) {
    this._renderedItems = Array.from(array).reverse();
    this._renderedItems.forEach((item) => {
      this._rendered(item);
    })
  }
}
