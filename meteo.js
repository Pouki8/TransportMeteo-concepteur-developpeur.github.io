function fetchWeatherData() {
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
}

function updateWeather(data) {
  const cityName = data.name;
  const temperature = (data.main.temp - 273.15).toFixed(1);
  const description = data.weather[0].description;

  document.getElementById("city-name").textContent = cityName;
  document.getElementById("temperature").textContent = `${temperature}°C`;
  document.getElementById("description").textContent = description;
}

// Fonction pour surveiller les changements du fichier conf.json
function watchConfFile() {
  const confFileUrl = 'conf.json';

  let lastModifiedTime = null;

  setInterval(() => {
    fetch(confFileUrl, { method: 'HEAD' })
      .then(response => {
        const currentModifiedTime = response.headers.get('last-modified');

        if (lastModifiedTime === null) {
          lastModifiedTime = currentModifiedTime;
        } else if (lastModifiedTime !== currentModifiedTime) {
          lastModifiedTime = currentModifiedTime;
          fetchWeatherData();
        }
      })
      .catch(error => {
        console.log("Une erreur s'est produite lors de la récupération du fichier conf.json :", error);
      });
  }, 3000); // Vérifie les changements toutes les 3 secondes
}

// Appel initial pour charger les données météo lors du chargement de la page
fetchWeatherData();

// Surveiller les changements du fichier conf.json
watchConfFile();
