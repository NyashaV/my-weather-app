let now = new Date();

let time = now.getHours();
let minutes = now.getMinutes();
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

let h3 = document.querySelector("h3.dayTimeHeading");
h3.innerHTML = `${day} </br> ${time}:${minutes} <br/> <hr/> Cloudy`;

//Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
function search(city) {
  let apiKey = "667d9f573c8af4c33457be5d561a9148";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  document.querySelector(
    "#city-search"
  ).innerHTML = `Weather for ${response.data.name}`;
  document.querySelector("#temprature-unit").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity:${response.data.main.humidity}`;
  document.querySelector("#wind").innerHTML = `Wind:${Math.round(
    response.data.wind.speed
  )}`;
  // Cant figure out why this isnt working....
  //  document.querySelector("#description").innerHTML =    response.data.weather[0].description;
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-input").value;
  search(city);
}
function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "667d9f573c8af4c33457be5d561a9148";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
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

// function celsius(event) {
//   event.preventDefault();
//   let celciusLink = document.querySelector("#temprature-unit");
//   celciusLink.innerHTML = `4`;
// }

// function fahrenheit(event) {
//   event.preventDefault();
//   let fahrenheit = document.querySelector("#temprature-unit");
//   fahrenheit.innerHTML = `40`;
// }

// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", celsius);
// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", fahrenheit);
