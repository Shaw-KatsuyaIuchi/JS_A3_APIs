/*
	Assignment 3 | COMP1073 Client-Side JavaScript - 01
	Katsuya Iuchi 200538257
	Rubayad
*/

/*
References
https://openweathermap.org/appid
https://developers.google.com/maps/documentation/javascript/web-components/overview?hl=en
*/

// Initialize the map and marker variable
let marker;

function initMap() {
    // Coordinates for Georgian College as the default starting point
    const defaultLocation = { lat: 44.4122, lng: -79.6687 };

    // Set up the map, centered at the default location with a zoom level of 14
    const map = new google.maps.Map(document.getElementById('map'), {
        center: defaultLocation,
        zoom: 14, // Zoom level 14 is used as per the initial instructions
    });

    // Create a marker at the default location
    marker = new google.maps.Marker({
        position: defaultLocation,
        map: map
    });

    // Retrieve weather data for the default location
    fetchWeatherData(defaultLocation.lat, defaultLocation.lng);

    // Add a click event listener to the map to handle marker placement
    google.maps.event.addListener(map, 'click', function(event) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        // Remove the existing marker before adding a new one
        marker.setMap(null);

        // Place a marker at the clicked location on the map
        marker = new google.maps.Marker({
            position: event.latLng,
            map: map,
        });

        // Retrieve weather data for the selected location
        fetchWeatherData(lat, lng);
    });
}

// Function to retrieve weather data based on given coordinates
async function fetchWeatherData(lat, lng) {
    // API key and URL for OpenWeatherMap
    const apiKey = 'f955dd34b1e7e9e488d1986279f781cb';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Display the retrieved weather data
        displayWeatherData(data);
    } catch (error) {
        console.error('Error retrieving weather data:', error);
    }
}

// Function to show weather data on the page
function displayWeatherData(data) {
    const weatherInfo = document.getElementById('weather-info');
    const temperature = data.main.temp;
    const description = data.weather[0].description;

    // Update the HTML with the weather information
    weatherInfo.innerHTML = `
        <h2>Weather Information</h2>
        <p>Temperature: ${temperature} °C</p>
        <p>Condition: ${description}</p>
    `;
}

// Run the initMap function when the window loads
window.onload = initMap;

