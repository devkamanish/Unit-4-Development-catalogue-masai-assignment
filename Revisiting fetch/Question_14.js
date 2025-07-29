const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('city');
const weatherDisplay = document.getElementById('weather');

// Replace with your actual API key
const API_KEY = 'YOUR_API_KEY';

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();

  // Input validation
  if (city === '') {
    weatherDisplay.textContent = 'Please enter a city name.';
    return;
  }

  fetchWeather(city);
});

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`City not found or network issue`);
    }

    const data = await response.json();

    const cityName = data.name;
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;

    weatherDisplay.textContent = `Weather in ${cityName}: ${temperature}°C, ${weatherDescription}`;
  } catch (error) {
    weatherDisplay.textContent = `Error: ${error.message}`;
  }
}
