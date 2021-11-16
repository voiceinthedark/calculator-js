/**
 * Calculator class (extendible)
 */
class Calculator {
  constructor() {
    this._mather = {
      "+": (a, b) => +a + +b,
      "-": (a, b) => +a - +b,
    };
  }

  _switcher(a, op, b) {
    return this._mather[op](a, b);
  }

  calculate(str) {
    return this._switcher(...str.split(" "));
  }

  addMethod(name, fn) {
    this._mather[name] = fn;
  }
}
