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
const clearButton = document.querySelector('#ce');
const plusMinusButton = document.querySelector('.plusmin');
const equalButton = document.querySelector('#equal');
const deleteButton = document.querySelector('#del');


let arrayOfNumbers = [];
let number = 0;
let result = 0;
let equationResult = Number.MIN_VALUE;
let operator = null;
equationHistory = {
  left: null,
  operator: null,
  right: null,
  result: null,
};


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
    if(equationHistory.left == null){
      number = Number(arrayOfNumbers.join(''));        
      operator = e.target.textContent;
      if(equationHistory.result){
        equationHistory.left = equationHistory.result;
        displayValue.textContent = equationHistory.left;
        equationHistory.right =  number;
        equationHistory.result = _calculate(equationHistory);
      } else {
        equationHistory.left = number;
      }
      equationHistory.operator = operator;      
      // console.log(equationHistory);
      arrayOfNumbers = [];
      displayHeader.textContent = operator;  
    } else {
      number = Number(arrayOfNumbers.join("")); 
      equationHistory.right = number;
      result = _calculate(equationHistory);
      operator = e.target.textContent;
      equationHistory.operator = operator;
      // console.log(equationHistory);
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
  displayHeader.textContent = "";
  displayValue.textContent = 0;
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
  if(displayValue.textContent.startsWith('-')){
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
  // console.log(equationHistory);
  displayValue.textContent = result;
  equationHistory.left = null;
  equationHistory.right = null;
  equationHistory.operator = null;
});

deleteButton.addEventListener('click', (e) => {
  console.log('in del');
  if(displayValue.textContent.length > 1){
    console.log(displayValue.textContent);
    displayValue.textContent = displayValue.textContent.slice(0,-1);
    arrayOfNumbers.pop();
    equationHistory.result = parseFloat((''+equationHistory.result).slice(0, -1));
  } else if(displayValue.textContent.length === 1){
    displayValue.textContent = 0;
    // displayValue.textContent = arrayOfNumbers.join('');
    arrayOfNumbers[0] = 0;
    equationHistory.result = 0;
  }
});

/**
 * Function to calculate the result of the equation; expects an object
 * @param {equationHistory} eq 
 */

function _calculate(eq) {

  if (arrayOfNumbers.length > 0) {
    equationResult = calculator.calculate(`${eq.left} ${eq.operator} ${eq.right}`);
    if(Number.isInteger(equationResult)){
      displayValue.textContent = equationResult;
    } else {
      displayValue.textContent = equationResult.toFixed(2);    
    }
    arrayOfNumbers = [];    
    eq.result = equationResult;
  }
  return equationResult;
}

