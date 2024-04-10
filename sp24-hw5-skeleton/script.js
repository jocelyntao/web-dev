// CLUE #0: See more info in the homework spec.
const apiKey = "a61da7288adf14d05005314e249e23b2";

const geocodingUrl = "http://api.openweathermap.org/geo/1.0/direct?q="; // This is beginning of the API call we use to convert city names to coordinates!
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?"; // This is beginning of the API call we use to convert coordinates to weather!

// DOM Targetting: Select the input element with the id "cityName" (CLUE #1)
const cityName = document.getElementById("cityName");
const mainWeather = document.getElementById("main-weather");
const weatherDescription = document.getElementById("weather-description");
const submitButton = document.getElementById("submit");

// This adds an event listener to check when the submit button is clicked,
// then if the cityName's value is not blank, we call setWeatherDescription with cityName.value as the argument.
submitButton.addEventListener("click", function () {
  if (cityName.value != "") {
    setWeatherDescription(cityName.value);
  }
});

// This function takes in a city name (that the user inputs), and gets the latitude and longitude
// of that city. This is important because our second API call, the one that actually gets the weather,
// requires a latitude and longitude coordinate pair.
async function getLatLon(city) {
  // Let's create the API url. (CLUE #2)
  const url = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;

  // Send a GET request to the url that you wrote above! (CLUE #3)
  const response = await fetch(url);
  const data = await response.json() //This line parses the response into JSON format so we can use it!

  // Let's return a JavaScript object here! (CLUE #4)

  return {
    "lat": data[0]["lat"],
    "lon": data[0]["lon"]
  }
}

// This function makes a GET request to retrieve weather data at a specific latitude and longitude.
// (CLUE #5)
async function getWeather(lat, lon) {
  const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
  const response = await fetch(url);
  const data = await response.json();
  

  // Return the main weather and weather description from the data variable! (CLUE #5.5)
  return {
    "main": data["weather"][0]["main"],
    "description": data["weather"][0]["description"]
  }
}

// This function gets the weather using the functions you wrote above and displays it in the HTML.
async function setWeatherDescription(city) {
  // This line calls getLatLon on the city name provided to find the latitude and longitude of that city.
  const coordinateData = await getLatLon(city);

  // Extract the lat and lon from coordinateData. (CLUE #6)
  const lat = coordinateData["lat"];
  const lon = coordinateData["lon"];


  const weatherData = await getWeather(lat, lon);

  // Same thing here, but we want to set mainWeather and weatherDescription's innerHTML to the relevant values in weatherData.
  // (CLUE #7)
  mainWeather.innerHTML = "🐻 " + weatherData["main"] + " 🐻";
  /* Set weatherDescription's innerHTML here */
  weatherDescription.innerHTML = "✨ " + weatherData["description"] + " ✨";
}
