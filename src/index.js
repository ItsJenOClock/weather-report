const state = {
  temp: 65,
  updatedTemp: null,
  landscapeContainer: null,
  increaseButton: null,
  decreaseButton: null,
  cityName: null,
  cityInput: null,
  sky: ['Sunny', 'Cloudy', 'Rainy', 'Snowy'],
  skyContainer: null,
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

const selectedSky = () => {
  if(state.sky === state.sky[0]) {
    state.skyContainer.innerHTML = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
  } else if (state.sky === state.sky[1]) {
    state.skyContainer.innerHTML = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
  } else if (state.sky === state.sky[2]) {
    state.skyContainer.innerHTML = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
  } else if(state.sky === state.sky[3]) {
    state.skyContainer.innerHTML = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
  }
  else {
    state.skyContainer.innerHTML = 'select a sky';
  }
};

const updateCity = () => {
  state.cityName.textContent = state.cityInput.value;
};

const loadControls = () => {
  state.landscapeContainer = document.getElementById('landscape');
  state.updatedTemp = document.getElementById('tempValue');
  state.increaseButton = document.getElementById('increaseTemperatureControl');
  state.decreaseButton = document.getElementById('decreaseTemperatureControl');
  state.cityName = document.getElementById('headerCityName');
  state.cityInput = document.getElementById('cityInputName');
  state.skyContainer = document.getElementById('skySelect');
}

const registerEventHandlers = () => {
  loadControls();
  updateLandscape();
  state.increaseButton.addEventListener('click', handleIncreaseButtonClicked);
  state.decreaseButton.addEventListener('click', handleDecreaseButtonClicked);
  state.cityInput.addEventListener('input', updateCity);
  state.skyContainer.addEventListener('change', selectedSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
