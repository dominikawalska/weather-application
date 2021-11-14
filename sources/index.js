function currentDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hour}:${minutes}`;
}

let now = new Date();
document.querySelector("#date").innerHTML = currentDate(now);

// Get temperature, wind, humidity and description
function displayWeatherCondition(response) {
  let cityElement = document.querySelector("#main-city");
  let temperatureElement = document.querySelector(".main-weather-temperature");
  let humidityElement = document.querySelector(".humidity");
  let windElement = document.querySelector(".wind");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  let icon = response.data.weather[0].icon;

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].main;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);
}

// default city
function search(city) {
  let units = "metric";
  let apiKey = "b0bc51fbf47aded8fd93326b74c97af1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

// Get city

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", showCity);

//Get my location

function handleCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "b0bc51fbf47aded8fd93326b74c97af1";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handleCurrentPosition);
}

let locationButton = document.querySelector(".my-location-button");
locationButton.addEventListener("click", getPosition);

// Get Celcius and Fahrenheit

function changeToCelcius(event) {
  event.preventDefault();
  let celsiusElement = document.querySelector(".main-weather-temperature");
  celsiusElement.innerHTML = "18";
}

let celsiusUnit = document.querySelector("#celsius");
celsiusUnit.addEventListener("click", changeToCelcius);

function changeToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitElement = document.querySelector(".main-weather-temperature");
  fahrenheitElement.innerHTML = "64";
}
let fahrenheitUnit = document.querySelector("#fahrenheit");
fahrenheitUnit.addEventListener("click", changeToFahrenheit);

search("Warszawa");
