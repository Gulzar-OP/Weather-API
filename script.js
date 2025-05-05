const apiKey = "89519b409f787da91fcbc5a5379d73aa"; // 👈 yahan apna API key daalo

document.getElementById("searchBtn").addEventListener("click", () => {
  fetchWeather();
});

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("cityInput").value = "Delhi"; // default city
  fetchWeather(); // automatically call on page load
});

function fetchWeather() {
  const city = document.getElementById("cityInput").value;
  const loc = document.getElementById("location");
  const timeData = document.querySelector(".Tdetails");
  const Details = document.getElementById("tempData");
  const dateDiv = document.querySelector(".date");
  const resultDiv = document.getElementById("resultDiv");
  const windSpeed = document.querySelector(".adv");
  const wCondition = document.querySelector(".weatherImg");

  if (city === "") {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      resultDiv.innerHTML = ""; // clear any previous error

      const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
      const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
      const dateNow = new Date().toLocaleDateString();

      timeData.innerHTML = `<h3>🕓 Time: ${new Date().toLocaleTimeString()}</h3>`;
      dateDiv.innerHTML = `<h3>📅 Date: ${dateNow}</h3>`;

      loc.innerHTML = `<h3>📍 Location: ${data.name}, ${data.sys.country}</h3>`;

      Details.innerHTML = `
        <h1>${data.main.temp} °C</h1>
        <h3>Feels like: ${data.main.feels_like} °C</h3>
        <p>🌅 Sunrise: ${sunriseTime}</p>
        <p>🌇 Sunset: ${sunsetTime}</p>
      `;

      windSpeed.innerHTML = `
        <p>💨 Wind Speed: ${data.wind.speed}</p>
        <p>💧 Humidity: ${data.main.humidity}</p>
        <p>🧭 Pressure: ${data.main.pressure}</p>
        <p> Sea Level: ${data.main.sea_level}
      `;

      const weather = data.weather[0];
      const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

      wCondition.innerHTML = `
        <img src="${iconUrl}" alt="${weather.description}">
        <p>${weather.main} - ${weather.description}</p>
      `;
      const condition = data.weather[0].main.toLowerCase(); // e.g. "clear", "clouds", etc.
      const mainSection = document.querySelector(".main");

      if (condition === "clear") {
        mainSection.style.backgroundImage = "url('images/sunny.jpg')";
      } else if (condition === "clouds") {
        mainSection.style.backgroundImage = "url('images/cloudy.jpg')";
      } else if (condition === "rain") {
        mainSection.style.backgroundImage = "url('images/rainy.jpg')";
      } else {
        mainSection.style.backgroundImage = "url('images/default.jpg')";
      }
      mainSection.style.backgroundSize = "cover";
      mainSection.style.backgroundPosition = "center";


    })
    .catch(error => {
      resultDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
}

//
// const weatherCondition = data.weather[0].main.toLowerCase(); // e.g., "clouds", "rain", "clear", etc.
// let imageUrl = "";

// if (weatherCondition === "clear") {
//   imageUrl = "images/sunny.png";
// } else if (weatherCondition === "clouds") {
//   imageUrl = "images/cloudy.png";
// } else if (weatherCondition === "rain") {
//   imageUrl = "images/rainy.png";
// } else if (weatherCondition === "snow") {
//   imageUrl = "images/snowy.png";
// } else {
//   imageUrl = "images/default.png";
// }

// document.querySelector(".weatherImg").innerHTML = `
//   <img src="${imageUrl}" alt="${weatherCondition}">
//   <p>${data.weather[0].description}</p>
// `;
