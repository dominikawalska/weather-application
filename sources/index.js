function currentDate(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  let day = days[now.getDay()];
  return `${day}, ${hour}:${minutes}`;
}

function displayWeatherCondition(response) {
  let cityElement = document.querySelector("#main-city");
  let dateElement = document.querySelector("#date");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  let icon = response.data.weather[0].icon;
  let temperatureElement = document.querySelector(".main-weather-temperature");
  let humidityElement = document.querySelector(".humidity");
  let windElement = document.querySelector(".wind");

  celsiusTemperatue = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  dateElement.innerHTML = currentDate(response.data.dt * 1000);
  descriptionElement.innerHTML = response.data.weather[0].main;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

function search(city) {
  let units = "metric";
  let apiKey = "b0bc51fbf47aded8fd93326b74c97af1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

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

function changeToCelcius(event) {
  event.preventDefault();
  let celsiusElement = document.querySelector(".main-weather-temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  celsiusElement.innerHTML = Math.round(celsiusTemperatue);
}

function changeToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitElement = document.querySelector(".main-weather-temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  fahrenheitElement.innerHTML = Math.round((9 / 5) * celsiusTemperatue + 32);
}

let celsiusTemperatue = null;

let form = document.querySelector("#city-form");
form.addEventListener("submit", showCity);

let locationButton = document.querySelector(".my-location-button");
locationButton.addEventListener("click", getPosition);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", changeToCelcius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

search("Warszawa");
