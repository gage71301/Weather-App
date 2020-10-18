$(initializeApp);

const key = "4bd34429190658990b2312d1e17b1902"

function formWatch() {
    $("#inpform").on("submit", e => {
        e.preventDefault();
        let city = $("#location").val();
        console.log(city);
        fetchWeather(city, key);

    })
}

function fetchWeather(city, key) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then(r => r.json())
    .then(rJson => displayResults(rJson))
    .catch(Error => alert("Sorry about that! Something seems to be wrong with your search, double check spelling :)"))
}

function kelvinToFar(temp) {
    return (temp - 273.15) * 9/5 + 32;
}

function newEntry() {
    $("#newcity").on("click", e => {
        $("#inpform").show();
        $("#newcity").hide();
    })
}

function displayResults(rJson) {

    console.log(rJson);

    const location = `<h1>${rJson.name}</h1>`
    const humidity = `<h2>Humidity: ${rJson.main.humidity}</h2>`
    const pressure = `<h2>Pressure: ${rJson.main.pressure}</h2>`
    const tempFar = `<h1>${Math.round(kelvinToFar(rJson.main.temp))} F°</h1>`
    console.log(tempFar)

    $("#area").html(location);
    $("#temperature").html(tempFar);
    $("#humidity").html(humidity);
    $("#pressure").html(pressure);

    $("#newcity").show();
    $("#inpform").hide();

}

function initializeApp() {
    $("#newcity").hide();
    formWatch();
    newEntry();
}