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

function formatForecastDay(timestamp) {
  let now = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];

  return day;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastDays = response.data.daily;
  let forecastHTML = `<div class="row row-cols-5">`;

  forecastDays.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="next-days">
      <div class="forecast-day">${formatForecastDay(forecastDay.dt)}</div>
      <img 
      src="https://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png"
      alt="Rain"
      width="42"> </img> 
      <div class="forecast-temperatures">
        <span class="forecast-temperature-max">${Math.round(
          forecastDay.temp.max
        )}°C</span>
        <span class="forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )}°C</span>
      </div>
    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "b0bc51fbf47aded8fd93326b74c97af1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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

  getForecast(response.data.coord);
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
