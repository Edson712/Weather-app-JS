let urlBase = 'https://api.openweathermap.org/data/2.5/weather';
let api_key = '72adae6abf51f7287ff223a49fe67128';
let difKelvin = 273.15;

document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityQuery').value;
    if (city) {
        fetchWeatherData(city);
    }
});

function fetchWeatherData(city) {
    fetch(`${urlBase}?q=${city}&appid=${api_key}`)
        .then(data => data.json())
        .then(data => showWeatherData(data));
}

function showWeatherData(data) {
    const divWeatherData = document.getElementById('weatherData');
    divWeatherData.innerHTML = '';

    const cityName = data.name;
    const countryName = data.sys.country;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    const cityTitle = document.createElement('h2');
    cityTitle.textContent = `${cityName}, ${countryName}`;

    const temperatureInfo = document.createElement('p');
    const temperatureKelvin = temperature;
    temperatureInfo.setAttribute('data-temperature', temperatureKelvin);
    temperatureInfo.setAttribute('data-unit', 'celsius');
    temperatureInfo.textContent = `Temperature is: ${Math.floor(temperature - difKelvin)}ºC`;

    const humidityInfo = document.createElement('p');
    humidityInfo.textContent = `Humidity is at: ${humidity}%`;

    const iconInfo = document.createElement('img');
    iconInfo.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    const descriptionInfo = document.createElement('p');
    descriptionInfo.textContent = `Weather forecast is: ${description}`;

    divWeatherData.appendChild(cityTitle);
    divWeatherData.appendChild(temperatureInfo);
    divWeatherData.appendChild(humidityInfo);
    divWeatherData.appendChild(iconInfo);
    divWeatherData.appendChild(descriptionInfo);
}

document.getElementById('toggleTemperature').addEventListener('click', () => {
    toggleTemperatureUnit();
});

function toggleTemperatureUnit() {
    const temperatureInfo = document.querySelector('#weatherData p[data-temperature]');
    if (temperatureInfo) {
        const currentUnit = temperatureInfo.getAttribute('data-unit');
        const temperatureKelvin = parseFloat(temperatureInfo.getAttribute('data-temperature'));
        if (currentUnit === 'celsius') {
            // Switch to Fahrenheit
            const temperatureFahrenheit = (temperatureKelvin * 9/5) - 459.67;
            temperatureInfo.textContent = `Temperature is: ${Math.floor(temperatureFahrenheit)}ºF`;
            temperatureInfo.setAttribute('data-unit', 'fahrenheit');
        } else {
            // Switch to Celsius
            const temperatureCelsius = temperatureKelvin - 273.15;
            temperatureInfo.textContent = `Temperature is: ${Math.floor(temperatureCelsius)}ºC`;
            temperatureInfo.setAttribute('data-unit', 'celsius');
        }
    }
}