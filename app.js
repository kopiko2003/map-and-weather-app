let map;
let geocoder;

// Initialize the Google Map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });
    geocoder = new google.maps.Geocoder();
}

// Function to handle the search button click
function searchLocation() {
    const location = document.getElementById('location-input').value;
    geocodeAddress(location);
}

// Function to handle Enter key press
function handleKeyDown(event) {
    if (event.key === 'Enter') {
        searchLocation();
    }
}

// Function to geocode the address and update the map
function geocodeAddress(address) {
    geocoder.geocode({ 'address': address }, (results, status) => {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            // Fetch and display the weather information for the location
            getWeather(results[0].geometry.location.lat(), results[0].geometry.location.lng());
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

// Function to fetch and display the weather information
function getWeather(lat, lon) {
    const apiKey = '128f3738714f55ea1eee46c605f82cb1';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherDiv = document.getElementById('weather');
            weatherDiv.innerHTML = `
                <h2>Weather Information</h2>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity} %</p>
            `;
        })
        .catch(error => console.error('Error fetching weather data:', error));
}
