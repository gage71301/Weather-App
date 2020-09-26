$(initializeApp);

const key = "3ad5dc036a5c694991e96e57c4d2f7c4"

function formWatch() {
    $("#inpform").on("submit", e => {
        e.preventDefault();
        let city = $("#location").val();
        console.log(city);
        fetchWeather(city, key);
    })
}

function fetchWeather(city, key) {
    fetch(`http://api.weatherstack.com/current?access_key=${key}&query=${city}`)
    .then(r => r.json())
    .then(rJson => displayResults(rJson))
    .catch(Error => alert("Sorry about that! Something seems to be wrong with your search, double check spelling :)"))
}

function celsToFar(temp) {
    return (temp * 9 / 5) + 32;
}

function newEntry() {
    $("#newcity").on("click", e => {
        $("#inpform").show();
        $("#newcity").hide();
    })
}

function displayResults(rJson) {

    console.log(rJson);

    const tempF = celsToFar(rJson.current.temperature);
    const location = `<h1>${rJson.location.name} ${rJson.location.region}</h1>`
    const humidity = rJson.current.humidity
    const temper = `<h2>${rJson.current.temperature}°C</h2>`

    $("#area").html(location);
    $("#temperature").html(temper);
    if(humidity > 50) {
        $("#humidity").html(`<h1>High Humidity ${humidity}%</h1>`)
    } else if(humidity < 30) {
        $("#humidity").html(`<h1>Low Humidity ${humidity}%</h1>`)
    } else {
        $("#humidity").html(`<h1>Normal Humidity ${humidity}%</h1>`)
    }

    $("#newcity").show();
    $("#inpform").hide();

}

function initializeApp() {
    $("#newcity").hide();
    formWatch();
    newEntry();
}