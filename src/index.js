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
}

let apiKey = "b1ta5fo0b2c2fb14c08155a243d01b42";
let apiURL = `https://api.shecodes.io/weather/v1/current?query=lisbon&key=${apiKey}`;

axios.get(apiURL).then(displayTemp);
