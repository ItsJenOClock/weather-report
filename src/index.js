const state = {
  temp: 65,
  currentTemp: null,
  landscapeContainer: null,
  increaseButton: null,
  decreaseButton: null,
  cityName: null,
  cityInput: null,
  realtimeTempButton: null,
};

const clickIncreaseTemp = () => {
  state.temp++;
  updateTemp();
  refreshUI();
};

const clickDecreaseTemp = () => {
  state.temp--;
  updateTemp();
  refreshUI();
};

const updateTemp = () => {
  state.currentTemp.textContent = state.temp;
};

const refreshUI = () => {
  if (state.temp >= 80) {
    state.currentTemp.style.color = 'red';
    state.currentTemp.classList.add('red');
    state.landscapeContainer.innerHTML = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
  } else if (state.temp >= 70 && state.temp <= 79) {
    state.currentTemp.style.color = 'orange';
    state.landscapeContainer.innerHTML = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
  } else if (state.temp >= 60 && state.temp <= 69) {
    state.currentTemp.style.color = 'gold';
    state.landscapeContainer.innerHTML = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
  } else if (state.temp >= 50 && state.temp <= 59) {
    state.currentTemp.style.color = 'green';
    state.landscapeContainer.innerHTML = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
  } else {
    state.currentTemp.style.color = 'teal';
  }
};

const updateCity = () => {
  state.cityName.textContent = state.cityInput.value;
};

const getLocation = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/location', {
      params: {
        q: state.cityName.textContent
      }
    });
    latitude = response.data[0].lat;
    longitude = response.data[0].lon;
    console.log('success! location:', latitude, longitude)
    return {
      lat: latitude,
      lon: longitude
    };
  } catch (error) {
    console.log('error with location:', error);
  }
};

const getTempBasedOnLocation = async (latitude, longitude) => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/weather', {
      params: {
        lat: latitude,
        lon: longitude
      }
    });
    state.temp = convertKelvinToFahrenehit(response.data.main.temp);
    console.log('success! temperature in F:', state.temp);
  } catch (error) {
    console.log('error with temp:', error);
  }
};

const convertKelvinToFahrenehit = (kelvinTemp) => {
  return Math.ceil((convertKelvinToCelsius(kelvinTemp)) * 9/5 + 32);
};

const convertKelvinToCelsius = (kelvinTemp) => {
  return Math.ceil(kelvinTemp - 273.15);
};

const clickRealtimeTemp = async () => {
  const loc = await getLocation();
  const realtimeTemp = await getTempBasedOnLocation(loc.lat, loc.lon);
  updateTemp();
  refreshUI();
};

const loadControls = () => {
  state.landscapeContainer = document.getElementById('landscape');
  state.currentTemp = document.getElementById('tempValue');
  state.increaseButton = document.getElementById('increaseTemperatureControl');
  state.decreaseButton = document.getElementById('decreaseTemperatureControl');
  state.cityName = document.getElementById('headerCityName');
  state.cityInput = document.getElementById('cityInputName');
  state.realtimeTempButton = document.getElementById('realtimeTemp');
};

const registerEventHandlers = () => {
  loadControls();
  refreshUI();
  state.increaseButton.addEventListener('click', clickIncreaseTemp);
  state.decreaseButton.addEventListener('click', clickDecreaseTemp);
  state.cityInput.addEventListener('input', updateCity);
  state.realtimeTempButton.addEventListener('click', clickRealtimeTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);