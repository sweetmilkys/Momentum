const WEATHER_API_KEY = "db42a7e15e9c6638d604e8f1009448e0",
    WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?",
    weather = document.querySelector(".js-weather");

function getWeather(coords) {
    fetch(`${WEATHER_API}lat=${coords.lat}&lon=${coords.lng}&appid=${WEATHER_API_KEY}&units=metric`)
        .then(response => {return response.json()})
        .then(json => {
            const temp = json.main.temp;
            const name = json.name;
            weather.innerHTML = `${Math.floor(temp)}° @ ${name}`;
        }); 
}

function handleGeoSuccess(position) {
    const lat = position.coords.latitude,
        lng = position.coords.longitude,
        coords = {
            lat,
            lng
        };
    localStorage.setItem("coords", JSON.stringify(coords));
    getWeather(coords);
}

function handleGeoFailure() {
    console.log("no location");
}

function loadWeather() {
    const currentCoords = localStorage.getItem("coords");
    if(currentCoords === null){
        navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoFailure);
    } else {
        getWeather(JSON.parse(currentCoords));
    }
}

function init(){
    loadWeather();
}

init();