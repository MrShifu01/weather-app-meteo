// Creating the DOM variables
const search = document.querySelector(".input")
const button = document.querySelector(".btn")
const temp = document.getElementById("temp")
const city = document.querySelector(".city")

// Adding event listener
button.addEventListener('click', getInfo)

async function getInfo () {

    // Geocoding for lon and lat values
    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${search.value}&count=1&language=en&format=json`)
    if (!geoResponse.ok) {
        throw new Error("Couldnt get information from Meteo")
    }
    let results = await geoResponse.json()
    data = results.results[0]

    const lat = data.latitude
    const lon = data.longitude
    city.textContent = `${data.name}, ${data.country_code}`
    
    // weather
    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
    if (!weatherResponse.ok) {
        throw new Error("Couldnt get information from Meteo")
    }
    let result = await weatherResponse.json()
    temp.textContent = `Current Temp: ${result.current_weather.temperature}`
}