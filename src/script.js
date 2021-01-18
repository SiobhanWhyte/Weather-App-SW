// Feature #1
function formatDate(date) {
    let dayCalender = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let currentDay = days[date.getDay()];
    let currentHour = date.getHours();
    let currentMinutes = date.getMinutes();
    let formattedDate = `${currentDay} ${currentHour}:${currentMinutes}`;
    return formattedDate;
  }
  
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  
  // Feature #2
  function search(event) {
    event.preventDefault();
    let cityElement = document.querySelector("#city");
    let cityInput = document.querySelector("#city-input");
    cityElement.innerHTML = cityInput.value;
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  //Show searched location//
  
  function showTemp(response) {
    let city = response.data.name;
    let temperature = Math.round(response.data.main.temp);
    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    cityElement.innerHTML = `${city}`;
    temperatureElement.innerHTML = `${temperature}`;
  
    // To change humidity and wind
  
    let humidity = response.data.main.humidity;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `Humidity: ${humidity}%`;
  
    let wind = Math.round(response.data.wind.speed);
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `Wind speed: ${wind} m/s`;
  
    let description = document.querySelector("#description");
    description.innerHTML = response.data.weather[0].main;
  }
  
  function showCity(event) {
    event.preventDefault();
    let searchCity = document.querySelector("#city-input").value;
    let apiKey = "ff303ed30d03e49c9c800ff139f1822f";
    let appUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`;
  
    axios.get(appUrl).then(showTemp);
  }
  let newCity = document.querySelector("#submit");
  newCity.addEventListener("click", showCity);
  
  //to celsius
  
  function celsiusConversion(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = temperatureElement.innerHTML;
    temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
  }
  
  let celsius = document.querySelector("#celsius-link");
  celsius.addEventListener("click", celsiusConversion);
  
  // to fahrenheit
  
  function fahrenheitConversion(event) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = temperatureElement.innerHTML;
    temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
  }
  
  let fahrenheit = document.querySelector("#fahrenheit-link");
  fahrenheit.addEventListener("click", fahrenheitConversion);
  
  //Show current location//
  
  function showCurrentLocationTemp(response) {
    let cityName = response.data.name;
    let temperature = Math.round(response.data.main.temp);
    let cityElement = document.querySelector("#city-input");
    let temperatureElement = document.querySelector("#temperature");
    cityElement.innerHTML = `${cityName}`;
    temperatureElement.innerHTML = `${temperature}`;
  }
  
  function searchLocation(position) {
    let apiKey = "ff303ed30d03e49c9c800ff139f1822f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(showTemp);
  }
  
  function getCurrentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  let currentLocation = document.querySelector("#currentLocation");
  currentLocation.addEventListener("click", getCurrentPosition);
  