let currentTime = new Date();
let year = currentTime.getFullYear();
let date = currentTime.getDate();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[currentTime.getMonth()];

function setDisplayDate() {
  let dateDisplay = document.querySelector("#date-display");
  let currentDate = `${day} | ${month} ${date} ${year} | ${hours}:${minutes}`;
  dateDisplay.innerHTML = currentDate;
}
setDisplayDate();

function city(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#location-search");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;
}

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", city);
searchForm.addEventListener("submit", getLocation);

function getTemp(response) {
  let mainTemp = document.querySelector("#main-temp");
  celTemp = Math.round(response.data.main.temp);
  mainTemp.innerHTML = `${celTemp}°C`;
}

function getHumidity(response) {
  let humidityNumber = document.querySelector("#humidity-number");
  humidityNumber.innerHTML = response.data.main.humidity;
}

function getWind(response) {
  let windNumber = document.querySelector("#wind-speed");
  windNumber.innerHTML = response.data.wind.speed;
}

function getCityNameUrl(response) {
  cityName = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityName}`;
}

function getWeatherDescription(response) {
  let wordDescription = document.querySelector("#word-description");
  wordDescription.innerHTML = response.data.weather[0].description;
}

function getWeatherIcon(response) {
  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
}

function getLocation(position) {
  let city = document.querySelector("#location-search");
  let apiKey = `0f11cd19ee1ec953a54c96fd4be0fcb4`;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(function (response) {
    getTemp(response);
    getHumidity(response);
    getWind(response);
    getWeatherDescription(response);
    getWeatherIcon(response);
  });
}

let celTemp = 0;

function celciusTemp() {
  let celciusDisplay = document.querySelector("#main-temp");
  celciusDisplay.innerHTML = `${celTemp}°C`;
}

let celciusButton = document.querySelector("#celcius-button");
celciusButton.addEventListener("click", celciusTemp);

function farenheitTemp() {
  let farTemp = celTemp * 1.8 + 32;
  farTemp = Math.round(farTemp);
  let farenheitDisplay = document.querySelector("#main-temp");
  farenheitDisplay.innerHTML = `${farTemp}°F`;
}

let farenheitButton = document.querySelector("#farenheit-button");
farenheitButton.addEventListener("click", farenheitTemp);

function getCurrentWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `0f11cd19ee1ec953a54c96fd4be0fcb4`;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(getTemp);
  axios.get(weatherUrl).then(getCityNameUrl);
}

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(getCurrentWeather);
}

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Fri", "Sat", "Sun", "Mon", "Tues"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col card text-center" id="forecast-2">
        ${day}
        <img class="forecast-image"
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        16° | 8°
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5f472f11cd19ee1ec953a54c96fd4be0fcb4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
