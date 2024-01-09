import { capitalize } from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    // console.log(this.listeners);
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);

      if (!this[method]) {
        console.log(this.$root);
        throw new Error(`Method ${method} is not implemented in ${this.name} component`);
      }

      // Тоже самое, что и addEventListener
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method])
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}


// Преобразовать название слушателя в метод. Например: click -> onClick
function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}