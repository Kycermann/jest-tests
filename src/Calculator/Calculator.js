const { generateRandomValue } = require(".");

class Calculator {
  constructor() {
    this._value = 0;
  }

  add(value) {
    this._value += value;
  }

  addLater(value, timeout = 0) {
    setTimeout(() => (this._value += value), timeout);
  }

  addRandom() {
    this._value += generateRandomValue();
  }

  addCallbackResult(callback) {
    this._value = +callback();
  }

  get result() {
    return this._value;
  }
}

module.exports = { default: Calculator };
