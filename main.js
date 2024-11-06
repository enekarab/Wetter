function fetchWeather() {
    var city = document.getElementById('city-input').value;
    var apiKey = `bab281d79e5f1e9755a68d754cc313e7`;
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=de`;

    fetch(apiUrl)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht ok');
            }
            return response.json();
        })
        .then(function(data) {
            displayWeather(data);
        })
        .catch(function(error) {
            console.error('Fehler:', error);
        });
}

function displayWeather(data) {
    var weatherOutput = document.getElementById('weather-output');
    var appMain = document.querySelector('.app-main');

    if (data && data.weather && data.main) {
        weatherOutput.innerHTML = `
            <h2>Wetter in ${data.name}</h2>
            <p>Temperatur: ${data.main.temp} °C</p>
            <p>Beschreibung: ${data.weather[0].description}</p>
        `;
        weatherOutput.style.display = 'block';

       
        var weatherBackgrounds = {
            clear: "url('./clear.png')",
            clouds: "url('./cloud.png')",
            rain: "url('./hagel.png')",
            drizzle: "url('./hagel.png')",
            snow: "url('./snow.png')",
            thunderstorm: "url('./sturm.png')",
            sun: "url('./sonne.png')"
        };

       
        var weatherType = data.weather[0].main.toLowerCase();
        var backgroundImage = weatherBackgrounds[weatherType] || "";

        
        document.body.style.backgroundImage = backgroundImage;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
    } else {
        weatherOutput.innerHTML = `<p>Stadt nicht gefunden.</p>`;
        weatherOutput.style.display = 'block';
        document.body.style.backgroundImage = "";
    }
}
