// Fonction pour récupérer et mettre à jour la météo
function fetchWeather() {
  fetch("conf.json")
    .then(response => response.json())
    .then(config => {
      const city = config.city; // Récupérer le nom de la ville à partir de la configuration

      // Appeler l'API météo avec le nom de la ville
      const apiKey = 'a2aacfdae1f99a5372617b466f045d34'; // clé d'API météo
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      // Récupérer les données météo depuis l'API
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const temperature = data.main.temp;
          const description = data.weather[0].description;

          // Afficher les données météo dans l'interface
          document.getElementById('city-name').innerText = city;
          document.getElementById('temperature').innerText = `${temperature} °C`;
          document.getElementById('description').innerText = description;
        })
        .catch(error => {
          console.log("Une erreur s'est produite lors de la récupération des données météo :", error);
        });
    })
    .catch(error => {
      console.log("Une erreur s'est produite lors de la récupération de la configuration :", error);
    });
}

// Mettre à jour la météo immédiatement
fetchWeather();

// Mettre à jour la météo toutes les heures (3600 secondes)
setInterval(fetchWeather, 3600000);
