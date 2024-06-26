const WEATHER_API_KEY = "d8e17c4bf2e9c6c4a1e4dfaf970742b6";
const cityName = "Mutare";
// Function to fetch weather data from OpenWeatherMap API
function fetchWeatherData() {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?
q=${cityName}&appid=${WEATHER_API_KEY}&units=metric`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayCurrentWeather(data.list[0]);
      displayForecast(data.list);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

// Function to display current weather
function displayCurrentWeather(weatherData) {
  const temp = document.querySelector(".temp");
  const icon = document.querySelector(".temp-icon");
  const humidity = document.querySelector(".humidity");
  const wind = document.querySelector(".wind");
  const rainProbability = document.querySelector(".rain-probability");
  temp.textContent = `${Math.round(weatherData.main.temp)}°`;
  //icon.innerHTML = `<i class="bi bi-sun"></i>`;
  humidity.textContent = `Humidity: ${weatherData.main.humidity}%`;
  wind.textContent = `Wind Speed: ${weatherData.wind.speed} m/s`;
  rainProbability.textContent = `Rain Probability: ${weatherData.pop * 100}%`;
}
// Function to display forecast for the next 3 days
function displayForecast(weatherData) {
  const forecastDays = document.querySelectorAll(".day");
  // Display forecast for the next 3 days only
  for (let i = 0; i < 3; i++) {
    const dayData = weatherData[i * 8 + 4];
    const dayName = forecastDays[i].querySelector(".day-name");
    const dayTemp = forecastDays[i].querySelector(".day-temp");
    const dayIcon = forecastDays[i].querySelector(".day-icon");
    dayName.textContent = new Date(dayData.dt * 1000)
      .toLocaleString("en-us", { weekday: "short" })
      .toUpperCase();
    dayTemp.textContent = `${Math.round(dayData.main.temp)}°`;
  }
}

// Function to get weather icon based on weather condition code
function getWeatherIcon(weatherCode) {
  const icons = {
    "01d": "sun-o", // Clear sky (day)
    "01n": "moon", // Clear sky (night)
    "02d": "cloudy-sunrain", // Few clouds (day)
    "02n": "cloud", // Few clouds (night)
    "03d": "cloud", // Scattered clouds (day)
    "03n": "cloud", // Scattered clouds (night)
    "04d": "clouds", // Broken clouds (day)
    "04n": "clouds", // Broken clouds (night)
    "09d": "cloud-drizzle", // Shower rain (day)
    "09n": "cloud-drizzle", // Shower rain (night)
    "10d": "cloud-rain", // Rain (day)
    "10n": "cloud-rain", // Rain (night)
    "11d": "cloud-lightning-rain", // Thunderstorm (day)
    "11n": "cloud-lightning-rain", // Thunderstorm (night)
    "13d": "snow", // Snow (day)
    "13n": "snow", // Snow (night)
    "50d": "cloud-fog", // Mist (day)
    "50n": "cloud-fog", // Mist (night)
  };
  return (
    icons[`${weatherCode.toString().slice(0, 2)}${timeOfDay()}`] || "question"
  );
}
// Helper function to determine day or night
function timeOfDay() {
  const currentHour = new Date().getHours();
  return currentHour >= 6 && currentHour < 18 ? "d" : "n";
}
// Fetch weather data on page load
fetchWeatherData();
