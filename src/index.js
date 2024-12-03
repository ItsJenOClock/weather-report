const state = {
  temp: 65,
  updatedTemp: null,
  landscapeContainer: null,
  increaseButton: null,
  decreaseButton: null,
};

const handleIncreaseButtonClicked = () => {
  state.temp++;
  updateTempUI();
  updateLandscape();
};

const handleDecreaseButtonClicked = () => {
  state.temp--;
  updateTempUI();
  updateLandscape();
};

const updateTempUI = () => {
  state.updatedTemp.textContent = state.temp;
};

const updateLandscape = () => {
  if (state.temp >= 80) {
    state.updatedTemp.style.color = 'red';
    state.landscapeContainer.innerHTML = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.temp >= 70 && state.temp <= 79) {
    state.updatedTemp.style.color = 'orange';
    state.landscapeContainer.innerHTML = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.temp >= 60 && state.temp <= 69) {
    state.updatedTemp.style.color = 'yellow';
    state.landscapeContainer.innerHTML = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.temp >= 50 && state.temp <= 59) {
    state.updatedTemp.style.color = 'green';
    state.landscapeContainer.innerHTML = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    state.updatedTemp.style.color = 'teal';
  }
};

const loadControls = () => {
  state.landscapeContainer = document.getElementById('landscape');
  state.updatedTemp = document.getElementById('tempValue');
  state.increaseButton = document.getElementById('increaseTemperatureControl');
  state.decreaseButton = document.getElementById('decreaseTemperatureControl');
}

const registerEventHandlers = () => {
  loadControls();
  updateLandscape();
  state.increaseButton.addEventListener('click', handleIncreaseButtonClicked);
  state.decreaseButton.addEventListener('click', handleDecreaseButtonClicked);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);