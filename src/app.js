function formatDate(timestamp) {
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
  ];
  let day = days[now.getDay()];
  return `${day} </br> ${hour}:${minutes} <hr />`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col-2" id="weatherday">
              <div class="forecastDay">${day}</div>
              <img
                src="https://images.theconversation.com/files/232705/original/file-20180820-30593-1nxanpj.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop"
                alt=""
                id="forecast-icon"
                width="30px"
              />
              <div class="forecastTemps">
                <span class="forecastTempMax">40°</span>
                <span class="forecastTempMin">9°</span>
              </div>
            </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "9afa0tbcd39f5a30316f363o86cafb4c";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function search(city) {
  let apiKey = "9afa0tbcd39f5a30316f363o86cafb4c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  let city = document.querySelector("#city-search");
  city.innerHTML = `Weather for ${response.data.city}`;

  let tempUnit = document.querySelector("#temprature-unit");
  tempUnit.innerHTML = Math.round(response.data.temperature.current);

  celsiusTemprature = response.data.temperature.current;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.temperature.humidity}`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}`;

  let description = document.querySelector(".description");
  description.innerHTML = response.data.condition.description;

  let timeHeading = document.querySelector(".dayTimeHeading");
  timeHeading.innerHTML = formatDate(response.data.time * 1000);

  document
    .querySelector("#icon")
    .setAttribute("src", `${response.data.condition.icon_url}`);
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.condition.icon);

  getForecast(response.data.coordinates);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-input").value;
  search(city);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "9afa0tbcd39f5a30316f363o86cafb4c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function yourLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

search("London");

let citySearch = document.querySelector(".citySearch");
citySearch.addEventListener("click", searchCity);

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", yourLocation);

let celsiusTemprature = null;
