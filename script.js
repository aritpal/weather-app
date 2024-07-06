const apiKey = 'bd5e378503939ddaee76f12ad7a97608'; //OpenWeatherMap API key

const locationForm = document.getElementById('location-form');
const locationInput = document.getElementById('location');
const weatherInfo = document.getElementById('weather-info');

function getWeather(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                updateWeatherUI(data);
            } else {
                weatherInfo.innerHTML = `<p>Error: ${data.message}</p>`;
            }
        })
        .catch(error => console.error(error));
}

function updateWeatherUI(data) {
    const city = data.name;
    const temp = Math.floor(data.main.temp - 273.15); // Convert Kelvin to Celsius (adjust for Fahrenheit)
    const description = data.weather[0].description;

    weatherInfo.innerHTML = `
    <h3>${city}</h3>
    <p>Temperature: ${temp}°C</p>
    <p>Description: ${description}</p>
  `;
}

locationForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const location = locationInput.value;
    if (location) {
        getWeather(location);
        locationInput.value = '';
    }
});