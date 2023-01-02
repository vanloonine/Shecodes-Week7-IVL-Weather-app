// Show today current of a city

function displayTemp(response) {
  console.log(response);
  let nowTemp = document.querySelector("#temperature-now");
  nowTemp.innerHTML = Math.round(response.data.temperature.current);
  let nowCity = document.querySelector("#city-name-search");
  nowCity.innerHTML = response.data.city;
  let nowDescription = document.querySelector("#description-now");
  nowDescription.innerHTML = response.data.condition.description;
  let nowFeels = document.querySelector("#feels-now");
  nowFeels.innerHTML = `Feels like: ${Math.round(
    response.data.temperature.feels_like
  )}°C`;
  let nowHumidity = document.querySelector("#humidity-now");
  nowHumidity.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  let nowWind = document.querySelector("#wind-now");
  nowWind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  let nowDate = document.querySelector("#date-now");
  nowDate.innerHTML = formatDate(response.data.time * 1000);
}

let apiKey = "b1ta5fo0b2c2fb14c08155a243d01b42";
let apiURL = `https://api.shecodes.io/weather/v1/current?query=sydney&key=${apiKey}`;

axios.get(apiURL).then(displayTemp);

//Show current time

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
