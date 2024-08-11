const calcKey = document.querySelectorAll('.calc__key');
const calcResult = document.querySelector('.calc__result');
const calcResultValue = document.querySelector('.calc__result__value');
const calcSmallResultOperation = document.querySelector('.calc__small__result__operation');

// Light/Dark Theme
const toggleElement = document.querySelector('.themes__toggle');

const toggleDarkTheme = () => toggleElement.classList.toggle('themes__toggle--isActive');

const toggleDarkThemeWithEnter = (event) => {
  event.key === 'Enter' && toggleDarkTheme();
};

toggleElement.addEventListener('keydown', toggleDarkThemeWithEnter);
toggleElement.addEventListener('click', toggleDarkTheme);

let result = 0;

let clickbaleOperation = false;

const availableNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const availableOperations = ['+', '-', '*', '/', 'Backspace', 'c', 'Enter'];

function evaluateExpression(expression) {
  try {
    const func = new Function('return ' + expression);
    return func();
  } catch (error) {
    let result = expression.slice(0, expression.length - 1);
    const func = new Function('return ' + result);
    return func();
    // return 'not correct';
  }
}

function formatNumberScientific(number) {
  const str = number.toString();

  if (str.length > 15) {
    return Number(number).toExponential(3);
  }

  return str;
}

function calculation(operationPosition, resultPostion) {
  let text = operationPosition.textContent;
  const result = evaluateExpression(text);
  let foramtNumber = formatNumberScientific(result);

  resultPostion.textContent = `${foramtNumber}`;
}


console.log(evaluateExpression('5 + 3 * 2')); // 11

const displayValue = function (type, value) {
  // check number and make calcResultValue not over 15 number

  if (type === 'number' && value === '.') {
    if (calcResultValue.textContent == '0') {
      return;
    }
    if (calcResultValue.textContent.includes('.')) {
      return;
    }
    calcResultValue.textContent += `${value}`;
  }

  //  check number and screen  number
  if (type === 'number' && value !== '.') {
    if (calcResultValue.textContent === '0') calcResultValue.textContent = '';
    calcResultValue.textContent += `${value}`;
    calculation(calcResultValue, calcSmallResultOperation);

    clickbaleOperation = true;
  }

  if (type === 'operation') {
    if (value === 'Backspace') {
      let Backspace = calcResultValue.textContent;
      removeCharacter = Backspace[Backspace.length - 1];
      Backspace = Backspace.slice(0, Backspace.length - 1);

      calcResultValue.textContent = Backspace;
      console.log(Backspace);

      if (Backspace === '') {
        calcResultValue.textContent = '0';
        calcSmallResultOperation.textContent = '0';
      }
      calculation(calcResultValue, calcSmallResultOperation);

      clickbaleOperation = true;
    }

    if (value === 'c') {
      calcResultValue.textContent = '0';
      calcSmallResultOperation.textContent = '0';
      clickbaleOperation = false;
    }

    if (!clickbaleOperation) return;

    if (value !== 'Backspace' && value !== 'c' && value !== 'Enter') {
      calcResultValue.textContent += `${value}`;
      clickbaleOperation = false;
    }

    if (value === 'Enter') {

      calculation(calcResultValue, calcResultValue);
      clickbaleOperation = true;
    }
  }
};

calcKey.forEach((el) => {
  let value = el.getAttribute('data-value');
  let type = el.getAttribute('data-type');

  el.addEventListener('click', () => {
    displayValue(type, value);
  });
});

window.addEventListener('keydown', (e) => {
  let value = e.key;
  console.log(e);

  console.log(value);

  let type;
  if (availableNumbers.includes(value)) {
    type = 'number';
  } else if (availableOperations.includes(value)) {
    type = 'operation';
  } else {
    return;
  }
  console.log(type);
  displayValue(type, value);
});
