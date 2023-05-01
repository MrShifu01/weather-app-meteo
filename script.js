// Creating the DOM variables
const search = document.querySelector(".input")
const button = document.querySelector(".btn")
const temp = document.getElementById("temp")
const weather = document.getElementById("weather")
const city = document.querySelector(".city")

// Adding event listener
button.addEventListener('click', getInfo)

async function getInfo() {
    // Clear previous error message
    const error = document.getElementById("error");
    error.textContent = "";

    try {
        // Geocoding for lon and lat values
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${search.value}&count=1&language=en&format=json`);

        if (!geoResponse.ok) {
            throw new Error("Couldn't get information from Meteo");
        }

        let results = await geoResponse.json();
        data = results.results[0];

        // If no data is returned, display an error message and return early
        if (!data) {
            throw new Error("No city found");
        }

        const lat = data.latitude;
        const lon = data.longitude;
        city.textContent = `${data.name}, ${data.country_code}`;

        // Weather
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);

        if (!weatherResponse.ok) {
            throw new Error("Couldn't get information from Meteo");
        }

        let result = await weatherResponse.json();
        temp.textContent = `Current Temp: ${result.current_weather.temperature}`;

        const code = result.current_weather.weathercode
        if (code === 0) {
            weather.textContent = "Clear"
        } else if (code === 1 ||code === 2 ||code === 3) {
            weather.textContent = "Partly Cloudy"
        } else if (code === 45 ||code === 48) {
            weather.textContent = "Foggy"
        } else if (code === 51 ||code === 53 ||code === 55) {
            weather.textContent = "Drizzle"
        } else if (code === 56 ||code === 57) {
            weather.textContent = "Freezing Drizzle"
        } else if (code === 61 ||code === 63 ||code === 65) {
            weather.textContent = "Rainy"
        } else if (code === 66 ||code === 67) {
            weather.textContent = "Freezing Rain"
        } else if (code === 71 ||code === 73 ||code === 75) {
            weather.textContent = "Snow fall"
        } else if (code === 77) {
            weather.textContent = "Snow grains"
        } else if (code === 80 ||code === 81 ||code === 82) {
            weather.textContent = "Rain Showers"
        } else if (code === 85 ||code === 86) {
            weather.textContent = "Snow Showers"
        } else if (code === 95) {
            weather.textContent = "Thunderstorms"
        } else if (code === 96 ||code === 99) {
            weather.textContent = "Thunderstorms with hail"
        }
        search.value = ''
    } catch (err) {
        error.textContent = "Search for Valid City";
        search.value = ''
    }
}

// Adding that hitting ENTER does the search
const inputEnter = document.querySelector(".input")

inputEnter.addEventListener("keyup", (event) => {
    
    if (event.key === "Enter") {
        const addbutton = document.querySelector('.btn')
        addbutton.click()
    }
})