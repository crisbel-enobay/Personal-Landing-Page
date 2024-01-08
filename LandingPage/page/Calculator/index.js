let display = document.getElementById('displayCalc');
let isNewInput = true;

function adjustFontSize() {
  const contentLength = display.value.length;
  if (contentLength < 11) {
    display.style.fontSize = '2em';
  } else if (contentLength < 14) {
    display.style.fontSize = '1.5em';
  } else {
    display.style.fontSize = '1em';
  }
}

function appendValue(value) {
  if (isNewInput) {
    display.value = value;
    isNewInput = false;
  } else {
    display.value += value;
  }
  adjustFontSize();
}
function clearDisplay() {
  display.value = '0';
  isNewInput = true;
  adjustFontSize();
}

function clearLastCharacter() {
  let currentValue = display.value;

  if (currentValue.length > 1) {
    display.value = currentValue.slice(0, -1);
  } else {
    display.value = '0';
    isNewInput = true;
  }
  adjustFontSize();
  return 0;
}
function percent() {
  let currentValue = display.value;
  let numbers = currentValue.split(/[\+\-\*\/]/);
  let lastNumber = numbers[numbers.length - 1];

  if (lastNumber !== '') {
    display.value = currentValue.replace(
      /[\d.]+$/,
      parseFloat(lastNumber) * 0.01
    );
  }
  adjustFontSize();
  return display.value;
}
function calculateResult() {
  try {
    display.value = eval(display.value);
    isNewInput = true;
  } catch {
    display.value = 'Error';
  }
  adjustFontSize();
}

// toggle light and dark theme
function changeTheme(theme) {
  const calcContainer = document.querySelector('.calculator');
  const buttons = document.querySelectorAll('.calculator .buttons button');
  const dispCalc = document.querySelector('#displayCalc');
  const bg = document.querySelector('#equal');

  const isDarkTheme = theme === 'dark';

  calcContainer.classList.toggle('light', !isDarkTheme);
  calcContainer.classList.toggle('dark', isDarkTheme);

  dispCalc.classList.toggle('inset', !isDarkTheme);
  dispCalc.classList.toggle('text-light', !isDarkTheme);
  dispCalc.classList.toggle('inset-dark', isDarkTheme);
  dispCalc.classList.toggle('text-dark', isDarkTheme);

  bg.classList.toggle('bg-blue', !isDarkTheme);
  bg.classList.toggle('bg-orange', isDarkTheme);

  buttons.forEach((button) => {
    button.classList.toggle('offset', !isDarkTheme);
    button.classList.toggle('offset-dark', isDarkTheme);
  });
}
