// ⏰Feature #1 - Done
//In your project, display the current date and time using
//JavaScript: Tuesday 16:00

let date = new Date();
console.log(date);

let dateText = document.querySelector("#date-text");
console.log(dateText);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[date.getDay()];
console.log(day);

let hour = date.getHours();
console.log(hour);

let minutes = date.getMinutes();
console.log(minutes);

dateText.innerHTML = day + " " + hour + ":" + minutes;

// when a user searches for a city (example: New York), it should display the
//name of the city on the result page and the current temperature of the city.

function adjustCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name-form");
  console.log(city.value);
  let cityInput = document.querySelector("#city-name");
  cityInput.innerHTML = `${city.value}`;

  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemp);
}

function showTemp(response) {
  console.log(response.data);
  let realTemperature = document.querySelector("#temperature");
  realTemperature.innerHTML = Math.round(response.data.main.temp);
  let realDescription = document.querySelector("#description");
  realDescription.innerHTML = response.data.weather[0].description;
  let realprecipitation = document.querySelector("#precipitation");
  realprecipitation.innerHTML = "";
  let realhumidity = document.querySelector("#humidity");
  realhumidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  let realwind = document.querySelector("#wind-speed");
  realwind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
}

let citySearch = document.querySelector("form");
console.log(citySearch);

citySearch.addEventListener("submit", adjustCity);

// Add a Current Location button. When clicking on it,
//it uses the Geolocation API to get your GPS coordinates and display and
//the city and current temperature using the OpenWeather API.

function showCurrentPostion(position) {
  console.log(position);
  let positionlat = position.coords.latitude;
  let positionlong = position.coords.longitude;
  console.log(positionlat);
  console.log(positionlong);

  let positionlat2 = parseFloat(positionlat).toFixed(2);
  console.log(positionlat2);

  let positionlong2 = parseFloat(positionlong.toFixed(2));
  console.log(positionlong2);

  let apiKey = "ab8e7ef210556986d1c9a75d6007b825";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${positionlat2}&lon=${positionlong2}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(showTemp2);
}

function showTemp2(response) {
  console.log(response.data);
  let currentCity = document.querySelector("#city-name");
  currentCity.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  let realTemperature = document.querySelector("#temperature");
  realTemperature.innerHTML = Math.round(response.data.main.temp);
  let realDescription = document.querySelector("#description");
  realDescription.innerHTML = response.data.weather[0].description;
  let realprecipitation = document.querySelector("#precipitation");
  realprecipitation.innerHTML = "";
  let realhumidity = document.querySelector("#humidity");
  realhumidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  let realwind = document.querySelector("#wind-speed");
  realwind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
}

let locationButton = document.querySelector("button");
console.log(locationButton);
locationButton.addEventListener("click", showCurrentPostion);

navigator.geolocation.getCurrentPosition(showCurrentPostion);
