document.addEventListener('DOMContentLoaded', () => {
  const resultInput = document.getElementById('result');
  const whiteRadiant = document.getElementById('whiteRadiant');
  let currentInput = '0';
  let currentOperator = '';
  let history = '';

  // Handle input from buttons
  window.liveScreen = (value) => {
    handleInput(value);
  };

  // Handle clear button
  window.clearScreen = () => {
    currentInput = '0';
    currentOperator = '';
    history = '';
    updateDisplay();
  };

  // Handle calculation
  window.calculate = () => {
    try {
      currentInput = eval(currentInput.replace('x', '*')).toString();
    } catch {
      currentInput = 'Error';
    }
    updateDisplay();

    // Trigger white radiant effect when '=' or 'Enter' is pressed
    triggerWhiteRadiantEffect();
  };

  // Handle input from keyboard
  document.addEventListener('keydown', (event) => {
    const key = event.key;
    handleInput(key);
  });

  function handleInput(key) {
    if (/\d/.test(key)) {
      if (currentInput === '0') currentInput = key;
      else currentInput += key;
    } else if (key === '.') {
      if (!currentInput.includes('.')) currentInput += '.';
    } else if (key === 'c' || key === 'C') {
      clearScreen();
    } else if (key === 'Backspace') {
      currentInput = currentInput.slice(0, -1) || '0';
    } else if (key === 'Enter' || key === '=') {
      calculate();
      return;
    } else if (['+', '-', '*', '/', 'x'].includes(key)) {
      if (currentOperator && currentInput[currentInput.length - 1].match(/[\+\-\*\/x]/)) {
        currentInput = currentInput.slice(0, -1);
      }
      currentInput += key;
    }

    updateDisplay();
  }

  function updateDisplay() {
    resultInput.value = currentInput;
  }

  function triggerWhiteRadiantEffect() {
    whiteRadiant.style.display = 'block';
    whiteRadiant.style.animation = 'none';
    whiteRadiant.offsetHeight; // Trigger reflow
    whiteRadiant.style.animation = null;
    setTimeout(() => {
      whiteRadiant.style.display = 'none';
    }, 2000); // Remove the white radiant effect after 2 seconds
  }
});
