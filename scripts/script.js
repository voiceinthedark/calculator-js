/**
 * Calculator class (extendible)
 */
class Calculator {
  constructor() {
    this._mather = {
      '+': (a, b) => +a + +b,
      '-': (a, b) => +a - +b,
      '*': (a, b) => +a * +b,
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
const leftPanel = document.querySelector('.left');
const calculatorContainer = document.querySelector('.calculator');

// leftPanel.focus();

let arrayOfNumbers = [];
let number = null;
let result = null;
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

document.addEventListener('keydown', (e) => {
  if (e.key === '.' && arrayOfNumbers.includes('.')) {
  } else if('1 2 3 4 5 6 7 8 9 0 .'.split(' ').includes(e.key)) {
    console.log('capturing numbers');
    arrayOfNumbers.push(e.key);
    displayValue.textContent = arrayOfNumbers.join('');
  } else if('+ - * /'.split(' ').includes(e.key)){    
    console.log('capturing', e.key);
    _operate(e, e.key);
  } else if(e.key === 'Enter' || e.key === '='){
    _equal();
  } else if(e.key === 'Backspace'){
    _deleteNumber();
  }
});

operatorsButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    // debugger;
    _operate(e);
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
  number = null;
  result = null;
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
  _equal();
});

/**
 * Equal function, capture the keyboard input of Enter
 */
function _equal() {
  number = Number(arrayOfNumbers.join(''));
  equationHistory.right = number;
  result = _calculate(equationHistory);
  displayValue.textContent = result;
  displayHeader.textContent = result;
  equationHistory.left = null;
  equationHistory.right = null;
  equationHistory.operator = null;  
}

/**
 * Delete button methods
 */

deleteButton.addEventListener('click', (e) => {
 _deleteNumber();
});

function _deleteNumber(){
   if (displayValue.textContent.length > 1) {
     displayValue.textContent = displayValue.textContent.slice(0, -1);
     displayHeader.textContent = displayValue.textContent;
     equationHistory.result = parseFloat(
       ('' + equationHistory.result).slice(0, -1)
       );
      console.log(equationHistory.result);
      if(displayValue.textContent.endsWith('.')){
        displayValue.textContent = displayValue.textContent.slice(0, -1);
        displayHeader.textContent = displayValue.textContent;
      }
   } else if (displayValue.textContent.length === 1) {
     displayValue.textContent = '';
     arrayOfNumbers[0] = '';
     equationHistory.result = null;
   }
}


/**
 * Power Buttons methods
 */
powerButtons.forEach( button => button.addEventListener('click', (e) => {
  // debugger;
  let toPower = e.target.innerHTML;

  switch (toPower) {
    case 'x²':
      _power('2');
      break;
    case 'x³':
      _power('3');
      break;      
    default:
      console.log('not matching');
      break;
  }  
}));

/**
 * Helper function for the power buttons functionality
 * @param {to the power of} p 
 */

function _power(p) {
  arrayOfNumbers = displayValue.textContent.split('');
  let eq = {
    left: equationHistory.left ?? displayValue.textContent,
    operator: '**',
    right: p,
  }
  result = _calculate(eq);
  equationHistory.result = _.round(result, 2);
  equationHistory.left = null;
  equationHistory.right = null;
  equationHistory.operator = null;
  displayValue.textContent = equationHistory.result;
  arrayOfNumbers = [];
}

function _powerY(y) {
    
}
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

/**
 * Main operator code, accepts an operatorCode which defaults to
 * the textContent of the target, or the event key in case of keyboard input.
 * @param {event} e 
 * @param {Code for operation} operatorCode 
 */

function _operate(e, operatorCode = e.target.textContent){
  if(e.target.textContent === 'y'){
    operatorCode = '**';
  }
  if (equationHistory.left == null) {
    number = Number(arrayOfNumbers.join(''));
    operator = operatorCode;
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
    operator = operatorCode;
    result = _calculate(equationHistory);
    equationHistory.operator = operator;
    displayHeader.textContent += operator;
    equationHistory.result = result;
    equationHistory.left = equationHistory.result;
    equationHistory.right = null;
  }
}

