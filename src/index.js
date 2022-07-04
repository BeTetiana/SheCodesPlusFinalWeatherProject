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
let showDate = document.querySelector("#date");
let nowDate = new Date();
showDate.innerHTML = formatDate(nowDate);

function searchForm(event) {
  event.preventDefault();
  let city = document.querySelector("#form-control").value;
  let apiKey = "1bbb13d9aa172c1c76474d1d6442cd2d";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showParameters);
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
  console.log(response.data);
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
