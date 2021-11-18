/**
 * Calculator class (extendible)
 */
class Calculator {
  constructor() {
    this._mather = {
      "+": (a, b) => +a + +b,
      "-": (a, b) => +a - +b,
      'x': (a, b) => +a * +b,
      "/": (a, b) => +a / +b,
    };
  }

  _switcher(a, op, b) {
    return this._mather[op](a, b);
  }

  calculate(str) {
    // console.log(str);
    return this._switcher(...str.split(" "));
  }

  addMethod(name, fn) {
    this._mather[name] = fn;
  }
}

const calculator = new Calculator();

/**
 * Elements capture
 */
const displayHeader = document.querySelector('.display-header');
const displayValue = document.querySelector(".display-value");
const numbersButtons = document.querySelectorAll(".number");
const operatorsButtons = document.querySelectorAll(".operator");



let arrayOfNumbers = [];
let leftSideNumber = [0];
let rightSideNumber = [];
let equationResult = Number.MIN_VALUE;
let leftNumber = 0;
let rightNumber = 0;
let operator = null;


/**
 * Numbers button methods
 */
numbersButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    arrayOfNumbers.push(e.target.textContent);
    displayValue.textContent = arrayOfNumbers.join("");    
  });
});

operatorsButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // debugger;
    leftNumber = Number(leftSideNumber.join(''));
    // rightNumber = 0;
    operator = e.target.textContent;    
    displayHeader.textContent = operator;    
    _calculate();
    
  });
});

function _calculate() {

  if (arrayOfNumbers.length > 0) {
    rightNumber = Number(arrayOfNumbers.join(''));
    equationResult = calculator.calculate(`${leftNumber} ${operator} ${rightNumber}`);
    leftNumber = equationResult;
    leftSideNumber = ('' + leftNumber).split('');
    displayValue.textContent = equationResult;    
    arrayOfNumbers = [];
  }
}

