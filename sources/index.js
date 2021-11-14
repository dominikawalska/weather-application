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
  document.querySelector("#main-city").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  document.querySelector(".main-weather-temperature").innerHTML = temperature;

  let humidityInput = Math.round(response.data.main.humidity);
  document.querySelector(".humidity").innerHTML = `Humidity: ${humidityInput}%`;

  let windInput = Math.round(response.data.wind.speed);
  document.querySelector(".wind").innerHTML = `Wind: ${windInput}km/h`;

  let descriptionInput = response.data.weather[0].main;
  document.querySelector("#description").innerHTML = descriptionInput;
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
