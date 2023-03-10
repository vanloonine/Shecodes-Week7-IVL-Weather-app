// Show today current of a city

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
  nowDate.innerHTML = "Last updated: " + formatDate(response.data.time * 1000);
  let nowIcon = document.querySelector("#icon-now");
  nowIcon.setAttribute("src", response.data.condition.icon_url);
  CelciusAPI = response.data.temperature.current;

  getforecast(response.data.city)
}

function search(city) {
  let apiKey = "b1ta5fo0b2c2fb14c08155a243d01b42";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiURL).then(displayTemp);
}

function formatForcastDay(timestamp){
   let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  return days[day];
}

function displayForecast(response2) {

  let forecast = response2.data.daily;

  console.log(forecast);

  let ForecastElement = document.querySelector("#row-next-days");

  let ForecastHTML = ``;

  forecast.forEach(function (forecast, index) {
    if (index < 6) {
    ForecastHTML = ForecastHTML + `
  <div class="col-2 forecast">
            <span class="forecast-day"> ${formatForcastDay(forecast.time)}</span>
            <img class="forecast-icon" src="${forecast.condition.icon_url}" alt="" />
            <span class="forecast-temp-max">${Math.round(forecast.temperature.maximum)}°</span> <span class="forecast-temp-divider"> | </span> <span class="forecast-temp-min">${Math.round(forecast.temperature.minimum)}°</span>
          </div>
    `
    }}
  )
ForecastElement.innerHTML = ForecastHTML; 
}


function getforecast (city){
  let apiKey = "b1ta5fo0b2c2fb14c08155a243d01b42";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiURL).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-name-form");
  console.log(citySearch.value);
  search(citySearch.value);
}


let form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);
console.log(form);

search("Antwerp");

