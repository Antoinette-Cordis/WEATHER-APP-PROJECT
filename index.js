function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[now.getDay()];
  let year = now.getFullYear();
  return `${year},${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = newDate(timestamp * 1000);
  let day = date.getDay();
  let days = ["Thurs", "Fri", "Sat", "Sun", "Mon"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML.forecastHTML +
        `<div class="col-2">
              <div class="weather-forecast-dates">${formatDay(
                forecastDay.dt
              )}</div>
              <img
                src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="40"
              />
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class="weather-forecast-temperature-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </div>  
            </div>
            `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function showForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=bd5b4461863eddaa6ced0a0a67989e0a&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function showTemperature(response) {
  console.log(response.data);
  let temperature = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let city = document.querySelector("#city");
  let date = document.querySelector("#date");
  let description = document.querySelector("#description");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  date.innerHTML = formatDate(response.data.dt * 1000);

  showForecast(response.data.coord);
}
function search(city) {
  let Apikey = "bd5b4461863eddaa6ced0a0a67989e0a";
  let Apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Apikey}&units=metrics`;
  axios.get(Apiurl).then(showTemperature);
}
function searchForm(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-input");
  search(cityElement.value);
}
search("Nigeria");
let form = document.querySelector("#search-input");
form.addEventListener("submit", searchForm);
