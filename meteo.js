fetch("conf.json")
  .then(response => response.json())
  .then(data => {
    const apiKey = data.apiKey;
    const city = data.city;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=fr`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        updateWeather(data);
      })
      .catch(error => {
        console.log("Une erreur s'est produite lors de la récupération des données météo :", error);
      });
  })
  .catch(error => {
    console.log("Une erreur s'est produite lors de la récupération de la configuration :", error);
  });

function updateWeather(data) {
  const cityName = data.name;
  const temperature = (data.main.temp - 273.15).toFixed(1);
  const description = data.weather[0].description;

  document.getElementById("city-name").textContent = cityName;
  document.getElementById("temperature").textContent = `${temperature}°C`;
  document.getElementById("description").textContent = description;
}