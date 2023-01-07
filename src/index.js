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
}


function displayForecast(){
  let ForecastElement = document.querySelector("#row-next-days");
  let ForecastHTML = `<div class="col-1"></div>`;
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed"]
  days.forEach (function(day){
    ForecastHTML = ForecastHTML + `
  <div class="col-2 forecast">
            <span class="forecast-day"> ${day}</span>
            <img class="forecast-icon" src="images/cloudy.png" alt="" />
            <span class="forecast-temp-max">10°</span> <span class="forecast-temp-divider"> | </span><span class="forecast-temp-min">5°</span>
          </div>
    `
}
  )
ForecastElement.innerHTML = ForecastHTML; 
}


  

function search(city) {
  let apiKey = "b1ta5fo0b2c2fb14c08155a243d01b42";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiURL).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-name-form");
  console.log(citySearch.value);
  search(citySearch.value);
}

function convertCtoF(event) {
  event.preventDefault;
  let FnowTemp = document.querySelector("#temperature-now");
  Celcius.classList.remove("active");
  Farhrenheit.classList.add("active");
  FnowTemp.innerHTML = Math.round((CelciusAPI * 9) / 5 + 32);
}

function convertFtoC(event) {
  event.preventDefault;
  let CnowTemp = document.querySelector("#temperature-now");
  Farhrenheit.classList.remove("active");
  Celcius.classList.add("active");
  CnowTemp.innerHTML = Math.round(CelciusAPI);
}

let form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);
console.log(form);

let Farhrenheit = document.querySelector("#Far");
Farhrenheit.addEventListener("click", convertCtoF);

let Celcius = document.querySelector("#celcius");
Celcius.addEventListener("click", convertFtoC);

let CelciusAPI = null;

search("Antwerp");
displayForecast();
