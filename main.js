const apicall = {
  key: "5d5f2dbe185840c70f2a34e8be445c00",
  base: "https://api.openweathermap.org/data/2.5/weather?",
};
//GEOLOACTION FETCHING

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError); //geoloaction get latitude and longitude of locations
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser Does't support Geolocation.</p>";
}

// //Set user position

 function setPosition(position) {
  let lat = position.coords.lat;
  let long = position.coords.lon;
   console.log(lat);
  console.log(long); 
  getWeather(lat, long);
} 

//SHOW  ERROR WHEN THERE IS ISSUE WITH LOCATION
function showError() {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

function getWeather(lat, long) {
  fetch(`${apicall.base}lat=${lat}&log=${long}&appid=${apicall.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

//INPUT LOCATION FETCHING

const searchbox = document.querySelector(".search");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${apicall.base}q=${query}&units=metric&appid=${apicall.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

//Display Output
function displayResults(weather) {
  //loaction
  let city = document.querySelector(".location .city");
  city.innerHTML = `${weather.name},${weather.sys.country}`;

  //icon
  let ico = document.querySelector(".location .icon");
  var icon = weather.weather[0].icon;
  var imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
  ico.innerHTML = "<img src=" + imageURL + ">";
  //date
  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  //time
  var timeZone = weather.timezone;
  timeZone = timeZone / 3600;
  var gmt = "GMT";
  if (timeZone !== 0) {
    gmt += timeZone > 0 ? " +" : " ";
    gmt += timeZone;
  }
  let fetchTime = document.querySelector(".location .time");
  fetchTime.innerHTML = gmt;

  //temperature
  let temp = document.querySelector(".current .temperature");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  //weather description
  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  //high and low weather
  let hilow = document.querySelector(".current .high-low");
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max
  )}°c`;
}

 function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
 

/* function newdate(d) {
  return `${pad(d.getDate, 2)} ${pad(d.getMonth() + 1, 2)} ${
    d.getFullYear() + 1900
  }`;
} */
