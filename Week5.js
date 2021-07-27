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

function getCityNameUrl(response) {
  cityName = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityName}`;
}

function getLocation(position) {
  let city = document.querySelector("#location-search");
  let apiKey = `0f11cd19ee1ec953a54c96fd4be0fcb4`;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(getTemp);
}

let celTemp = 0;

function celciusTemp() {
  let celciusDisplay = document.querySelector("#main-temp");
  celciusDisplay.innerHTML = `|${celTemp}°C`;
}

let celciusButton = document.querySelector("#celcius-button");
celciusButton.addEventListener("click", celciusTemp);

function farenheitTemp() {
  let farTemp = celTemp * 1.8 + 32;
  farTemp = Math.round(farTemp);
  let farenheitDisplay = document.querySelector("#main-temp");
  farenheitDisplay.innerHTML = `|${farTemp}°F`;
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
