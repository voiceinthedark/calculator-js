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
let number = 0;
// let leftSideNumber = [0];
// let rightSideNumber = [];
let equationResult = Number.MIN_VALUE;
// let leftNumber = 0;
// let rightNumber = 0;
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
      let result = _calculate(equationHistory);
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
 * Function to calculate the result of the equation; expects an object
 * @param {equationHistory} eq 
 */

function _calculate(eq) {

  if (arrayOfNumbers.length > 0) {
    equationResult = calculator.calculate(`${eq.left} ${eq.operator} ${eq.right}`);
    displayValue.textContent = equationResult;    
    arrayOfNumbers = [];    
    eq.result = equationResult;
  }
  return equationResult;
}

function _hasNull(target) {
  for (let member in target) {
    if (target[member] == null) return true;
  }
  return false;
}
