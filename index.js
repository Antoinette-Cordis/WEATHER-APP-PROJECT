function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 0) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[now.getDay()];
  return `${day} ${hours}:${minutes}`;
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
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  date.innerHTML = formatDate(response.data.dt * 1000);
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
let form = document.querySelector("#search-input");
form.addEventListener("submit", searchForm);
