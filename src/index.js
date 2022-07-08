function formatTime(time) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[time.getDay()];

  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

let showTime = document.querySelector("#dayWeek");
let now = new Date();
showTime.innerHTML = formatTime(now);

function formatDate(dat) {
  let date = dat.getDate();
  if (date < 10) {
    date = `0${date}`;
  }

  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let month = months[dat.getMonth()];

  let year = dat.getFullYear();

  return `${date}.${month}.${year}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

let showDate = document.querySelector("#date");
let nowDate = new Date();
showDate.innerHTML = formatDate(nowDate);

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `  
    <div class="col-2">
      <div class="form-group-week">${formatDay(forecastDay.dt)}</div>
      <div class="form-group-weatherIcon">
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"/>
      </div>
      <div class="form-group-temperature">
        <span class="form-group-temperature-max">${Math.round(
          forecastDay.temp.max
        )}</span>° <span
          class="form-group-temperature-min"
          >${Math.round(forecastDay.temp.min)}</span
        >°
      </div>
    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function searchForm(event) {
  event.preventDefault();
  let city = document.querySelector("#form-control").value;
  let apiKey = "1bbb13d9aa172c1c76474d1d6442cd2d";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showParameters);
}
function getForecast(coordinates) {
  let apiKey = "1bbb13d9aa172c1c76474d1d6442cd2d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showParameters(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#celsius-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#weather").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  celsiusTemp = response.data.main.temp;

  getForecast(response.data.coord);
}

let weatherSearchForm = document.querySelector("#weather-search-form");
weatherSearchForm.addEventListener("submit", searchForm);

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "1bbb13d9aa172c1c76474d1d6442cd2d";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showParameters);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function tempFahrenheit(event) {
  event.preventDefault();

  let fahrenheit = document.querySelector("#celsius-temperature");
  celsiumTemperature.classList.remove("active");
  fahrenheitTemperature.classList.add("active");
  let math = Math.round((celsiusTemp * 9) / 5 + 32);
  fahrenheit.innerHTML = `${math}`;
}

function tempCelsium(event) {
  event.preventDefault();
  celsiumTemperature.classList.add("active");
  fahrenheitTemperature.classList.remove("active");

  let celsium = document.querySelector("#celsius-temperature");
  celsium.innerHTML = Math.round(celsiusTemp);
}
let celsiusTemp = null;

let fahrenheitTemperature = document.querySelector("#fahrenheit");
fahrenheitTemperature.addEventListener("click", tempFahrenheit);

let celsiumTemperature = document.querySelector("#celsium");
celsiumTemperature.addEventListener("click", tempCelsium);
