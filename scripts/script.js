/**
 * Calculator class (extendible)
 */
class Calculator {
  constructor() {
    this._mather = {
      '+': (a, b) => +a + +b,
      '-': (a, b) => +a - +b,
      'x': (a, b) => +a * +b,
      '/': (a, b) => +a / +b,
    };
  }

  _switcher(a, op, b) {
    console.log(a, op, b);
    return this._mather[op](a, b);
  }

  calculate(str) {
    return this._switcher(...str.split(' '));
  }

  addMethod(name, fn) {
    this._mather[name] = fn;
  }
}

const calculator = new Calculator();
// Adding power method
calculator.addMethod('**', (a, b) => {
  return (+a) ** +b
});

/**
 * Elements capture
 */
const displayHeader = document.querySelector('.display-header');
const displayValue = document.querySelector('.display-value');
const numbersButtons = document.querySelectorAll('.number');
const operatorsButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('#ce');
const plusMinusButton = document.querySelector('.plusmin');
const equalButton = document.querySelector('#equal');
const deleteButton = document.querySelector('#del');
const powerButtons = document.querySelectorAll('.pow');

let arrayOfNumbers = [];
let number = 0;
let result = 0;
let equationResult = Number.MIN_VALUE;
let operator = null;
let equationHistory = {
  left: null,
  operator: null,
  right: null,
  result: null,
};

/**
 * Numbers button methods
 */
numbersButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    if (e.target.textContent === '.' && arrayOfNumbers.includes('.')) {
    } else {
      arrayOfNumbers.push(e.target.textContent);
      displayValue.textContent = arrayOfNumbers.join('');
    }
  });
});

operatorsButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    // debugger;
    if (equationHistory.left == null) {
      number = Number(arrayOfNumbers.join(''));
      operator = e.target.textContent;
      if (equationHistory.result) {
        equationHistory.left = equationHistory.result;
        displayValue.textContent = equationHistory.left;
        equationHistory.right = number;
        displayHeader.textContent += '' ?? equationHistory.right;
        equationHistory.result = _calculate(equationHistory);
      } else {
        equationHistory.left = number;
        displayHeader.textContent += equationHistory.left;
      }
      equationHistory.operator = operator;
      displayHeader.textContent += operator;
      arrayOfNumbers = [];
    } else {
      number = Number(arrayOfNumbers.join(''));
      equationHistory.right = number;
      displayHeader.textContent += equationHistory.right;
      operator = e.target.textContent;
      result = _calculate(equationHistory);
      equationHistory.operator = operator;
      displayHeader.textContent += operator;
      equationHistory.result = result;
      equationHistory.left = equationHistory.result;
      equationHistory.right = null;
    }
  });
});

/**
 * Clear button methods
 */
clearButton.addEventListener('click', (e) => {
  equationHistory = {
    left: null,
    operator: null,
    right: null,
    result: null,
  };
  displayHeader.textContent = '';
  displayValue.textContent = '';
  arrayOfNumbers = [];
  number = 0;
  result = 0;
  equationResult = Number.MIN_VALUE;
  operator = null;
});

/**
 * Plus/minus button method
 */
plusMinusButton.addEventListener('click', (e) => {
  if (displayValue.textContent.startsWith('-')) {
    displayValue.textContent = displayValue.textContent.slice(1);
    arrayOfNumbers.shift();
  } else {
    displayValue.textContent = '-'.concat(displayValue.textContent);
    arrayOfNumbers.unshift('-');
  }
});

/**
 * Equal button methods
 */
equalButton.addEventListener('click', (e) => {
  number = Number(arrayOfNumbers.join(''));
  equationHistory.right = number;
  result = _calculate(equationHistory);
  displayValue.textContent = result;
  displayHeader.textContent = result;
  equationHistory.left = null;
  equationHistory.right = null;
  equationHistory.operator = null;
});

/**
 * Delete button methods
 */

deleteButton.addEventListener('click', (e) => {
  console.log('in del');
  if (displayValue.textContent.length > 1) {
    displayValue.textContent = displayValue.textContent.slice(0, -1);
    arrayOfNumbers.pop();
    equationHistory.result = parseFloat(
      ('' + equationHistory.result).slice(0, -1)
    );
  } else if (displayValue.textContent.length === 1) {
    displayValue.textContent = '';
    arrayOfNumbers[0] = '';
    equationHistory.result = null;
  }
});

powerButtons.forEach( button => button.addEventListener('click', (e) => {
  // debugger;
  if (e.target.innerHTML == 'x²') {
    let result = calculator.calculate(`${equationHistory.left ?? displayValue.textContent} ${'**'} ${'2'}`);
    equationHistory.result = _.round(result, 2);
    equationHistory.left = null;
    equationHistory.right = null;
    equationHistory.operator = null;
    displayValue.textContent = equationHistory.result;
    arrayOfNumbers = [];
  } else if (e.target.innerHTML == 'x&sup3;') {
    let result = _calculate({
      left: equationHistory.left,
      operator: '**',
      right: 3,
      result: null,
    });
    equationHistory.result = result;
  } else if (e.target.innerText == 'y') {
  }
}));

/**
 * Function to calculate the result of the equation; expects an object
 * @param {equationHistory} eq
 */

function _calculate(eq) {
  if (arrayOfNumbers.length > 0) {
    equationResult = calculator.calculate(
      `${eq.left} ${eq.operator} ${eq.right}`
    );
    if (Number.isInteger(equationResult)) {
      displayValue.textContent = equationResult;
    } else {
      displayValue.textContent = equationResult.toFixed(2);
    }
    arrayOfNumbers = [];
    eq.result = _.round(equationResult, 2);
  }
  return _.round(equationResult, 2);
}
