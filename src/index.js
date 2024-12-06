const state = {
  temp: null,
  tempElement: null,
  landscapeContainer: null,
  increaseButton: null,
  decreaseButton: null,
  cityName: 'Seattle',
  cityInput: null,
  realtimeTempButton: null,
  skyOptions: ['Sunny', 'Cloudy', 'Rainy', 'Snowy'],
  skyContainer: null,
  skySelect: null,
  sky: null,
  resetButton: null,
  degreeType: null,
  degreeTypeRadioButtons: null,
};

const clickIncreaseTemp = () => {
  if (state.degreeType === 'fahrenheit') {
    state.temp++;
  } else if (state.degreeType === 'celsius') {
    state.temp += 9 / 5;
  }
  updateTempBasedOnDegreeType();
  refreshTempUI();
};

const clickDecreaseTemp = () => {
  if (state.degreeType === 'fahrenheit') {
    state.temp--;
  } else if (state.degreeType === 'celsius') {
    state.temp -= 9 / 5;
  }
  updateTempBasedOnDegreeType();
  refreshTempUI();
};

const refreshTempUI = () => {
  const tempRangeOptions = [
    { minTemp: 100, colorClassName: 'maroon', landscape: '🔥_🌋🔥_🔥🔥_🔥__🏜🦂_🦎' },
    { minTemp: 90, colorClassName: 'red', landscape: '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂' },
    { minTemp: 80, colorClassName: 'orange', landscape: '🌊🌊🏖️_🌺_🐚🏝️⛱️🌴🌺_🌴' },
    { minTemp: 70, colorClassName: 'yellow', landscape: '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷' },
    { minTemp: 60, colorClassName: 'yellow-green', landscape: '🌲🌳🌳_🌲🏕️🌲🍄‍🟫_🌳🍄🌲🌲' },
    { minTemp: 50, colorClassName: 'green', landscape: '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃' },
    { minTemp: 40, colorClassName: 'sea-green', landscape: '🍂🍁__🌰🐿️_🪵🍁🍂🥀🍂🍂' },
    { minTemp: 30, colorClassName: 'teal', landscape: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲' },
    { minTemp: -Infinity, colorClassName: 'blue', landscape: '⛄️🌲🦌🗻🧊🌲🌲🦌🧊🗻🌲🧊🧊' }
  ];
  state.tempElement.classList.value = '';
  for (const tempRange of tempRangeOptions) {
    if (state.temp >= tempRange.minTemp) {
      state.tempElement.classList.toggle(tempRange.colorClassName);
      state.landscapeContainer.innerHTML = tempRange.landscape;
      break;
    }
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
    let latitude = response.data[0].lat;
    let longitude = response.data[0].lon;
    console.log(`success! location coords of ${response.data[0].display_name}: ${latitude}, ${longitude}`);
    return {
      lat: latitude,
      lon: longitude
    };
  } catch (error) {
    console.log('error with location:', error);
    if (error instanceof TypeError || error.message === "Request failed with status code 400") alert('Error. Please input a valid city.');
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
    console.log('success! temp in F:', state.temp);
  } catch (error) {
    console.log('error with temp:', error);
  }
};

const convertKelvinToFahrenehit = (kelvinTemp) => {
  return ((kelvinTemp - 273.15) * 9 / 5) + 32;
};

const convertFahrenheitToCelsius = (fahrenheitTemp) => {
  return (fahrenheitTemp - 32) * 5 / 9;
};

const getRealtimeTemp = async () => {
  const loc = await getLocation();
  await getTempBasedOnLocation(loc.lat, loc.lon);
  updateTempBasedOnDegreeType();
  refreshTempUI();
};

const selectedSky = () => {
  state.sky = state.skySelect.value;
  state.gardenContent.classList.remove('sunny', 'cloudy', 'rainy', 'snowy');
  if (state.sky === state.skyOptions[0]) {
    state.skyContainer.innerHTML = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
    state.gardenContent.classList.add('sunny');
  } else if (state.sky === state.skyOptions[1]) {
    state.skyContainer.innerHTML = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
    state.gardenContent.classList.add('cloudy');
  } else if (state.sky === state.skyOptions[2]) {
    state.skyContainer.innerHTML = '🌧🌈⛈️🌧🌧💧⛈️🌧🌦🌧💧🌧🌧';
    state.gardenContent.classList.add('rainy');
  } else if (state.sky === state.skyOptions[3]) {
    state.skyContainer.innerHTML = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
    state.gardenContent.classList.add('snowy');
  } else {
    state.skyContainer.innerHTML = '';
  }
};

const resetCityName = () => {
  state.cityInput.value = 'Seattle';
  updateCity();
  getRealtimeTemp();
};

const updateTempBasedOnDegreeType = () => {
  state.degreeType = document.querySelector('input[name="degrees"]:checked').value;
  if (state.degreeType === 'fahrenheit') {
    state.tempElement.textContent = Math.round(state.temp);
  } else if (state.degreeType === 'celsius') {
    state.tempElement.textContent = Math.round(convertFahrenheitToCelsius(state.temp));
  }
};

const loadControls = () => {
  state.landscapeContainer = document.getElementById('landscape');
  state.tempElement = document.getElementById('tempValue');
  state.increaseButton = document.getElementById('increaseTemperatureControl');
  state.decreaseButton = document.getElementById('decreaseTemperatureControl');
  state.cityName = document.getElementById('headerCityName');
  state.cityInput = document.getElementById('cityInputName');
  state.realtimeTempButton = document.getElementById('realtimeTemp');
  state.skyContainer = document.getElementById('sky');
  state.skySelect = document.getElementById('skySelect');
  state.gardenContent = document.getElementById('gardenContent');
  state.resetButton = document.getElementById('cityNameReset');
  state.degreeType = document.querySelector('input[name="degrees"]:checked').value;
  state.degreeTypeRadioButtons = document.querySelectorAll('input[name="degrees"]');
  resetCityName();
  refreshTempUI();
};

const registerEventHandlers = () => {
  loadControls();
  state.increaseButton.addEventListener('click', clickIncreaseTemp);
  state.decreaseButton.addEventListener('click', clickDecreaseTemp);
  state.cityInput.addEventListener('input', updateCity);
  state.realtimeTempButton.addEventListener('click', getRealtimeTemp);
  state.skySelect.addEventListener('change', selectedSky);
  state.resetButton.addEventListener('click', resetCityName);
  state.degreeTypeRadioButtons.forEach((button) => {
    button.addEventListener('change', updateTempBasedOnDegreeType);
  });
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);