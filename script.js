//GIVEN a weather dashboard with form inputs
//WHEN I view the UV index
//THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
//WHEN I view future weather conditions for that city
//THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
//WHEN I click on a city in the search history
//THEN I am again presented with current and future conditions for that city -->

//seacrh a city =>>>>> results: current and future conditions for that city, also adds city to the search history
//current conditions must include: city name, the date, an icon represntation of weather conditions, temperature, humidity, wind speed, and UV index

//when viewing the UV index there is some sort of color that indicates weather consditions (favorable moderate or severe)
//future conditions must include the date, icon to represent weather condiditons, temperature, and the humidity
//clicking a city int he search history results with the current and future conditions for that city-->
//***************************************************************************************************************************************************

//queryURL = "http://api.agromonitoring.com/agro/1.0/weather/forecast";
var searchInput = document.getElementById("search")
var searchBtn = document.getElementById("searchButton")
var currentWeatherDiv = document.getElementById("currentWeather")
var currentWeatherDiv = document.getElementById("forecastWeather")
// var cityState// = "Philadelphia,Pennsylvania"
var key = "2fa59b59479c530d5e14fffc2215ca1c";
var lon;
var lat;
var imgSrc = "http://openweathermap.org/img/wn/" /*insert api icon @ position 33*/ + "@2x.png"

searchBtn.addEventListener("click", search)

function search() {
    // cityState = searchInput.value
    currentWeather(searchInput.value);
}
function currentWeather(city) {
    // var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=" + cityState + "&appid=" + key;// + "&mode=JSON";
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //seacrh a city =>>>>> results: current and future conditions for that city, also adds city to the search history
        //current conditions must include: city name, the date, an icon represntation of weather conditions, temperature, humidity, wind speed, and UV index
        currentWeatherDiv.textContent = response.name
        let cityName = document.createElement("h3")
        cityName.textContent = response.name
        // let src = response.weather[0].icon
        imgSrc.slice(0, 33) , response.weather[0].icon
        console.log(imgSrc)
        let img = document.createElement("img")
        img.setAttribute("src", imgSrc);
        currentWeatherDiv.appendChild(img)
        console.log("Temperature: " + response.main.temp)//TODO convert to farenhiet
        console.log("Humidity: " + response.main.humidity)
        console.log("Wind Speed:" + response.wind.speed)
        lon = response.coord.lon
        lat = response.coord.lat
        // console.log(lat + "   " + lon)
        console.log(response.dt)
        let unixTimestamp = response.dt
        // https://www.geeksforgeeks.org/how-to-convert-unix-timestamp-to-time-in-javascript/
        //TODO clean up/condense
        dateObj = new Date(unixTimestamp * 1000);
        utcString = dateObj.toUTCString();
        console.log("Timestamp: " + utcString)
        var uviURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + lat + "&lon=" + lon
        // http://api.openweathermap.org/data/2.5/uvi/history?appid={appid}&lat={lat}&lon={lon}
        console.log(uviURL)
        $.ajax({
            url: uviURL,
            method: "GET"
        }).then(function (response) {
            var uviIndex = response.value
            if(uviIndex < 3) {
                console.log("favorable")//TODO green
            } else if (uviIndex >= 2 && uviIndex <= 5) {
                console.log("moderate")//TODO yellow
            } else {
                console.log("severe")//TODO red
            }
            console.log(response.value)
    
        })
    });
}



// var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityState + "&appid=" + key
// $.ajax({
//     url : forecastURL,
//     method : "GET"
// }).then( (forecast) => {
//     console.log(forecast)
//     console.log(forecast.list[0])
//     console.log(forecast.list[0].dt_txt)
//     // console.log(forecast.list[0].weather.icon)
//     let icon = "http://openweathermap.org/img/wn/" + forecast.list[0].weather[0].icon + "@2x.png"
//     console.log(icon)
//     let img = document.createElement("img")
//     img.setAttribute("src", icon)
//     document.body.appendChild(img)
//     console.log(forecast.list[0].main.temp)
//     console.log(forecast.list[0].main.humidity)

//     // console.log(forecast.list[0])
//     // console.log(forecast.list[0])
// })
//when viewing the UV index there is some sort of color that indicates weather consditions (favorable moderate or severe)
//future conditions must include the date, icon to represent weather condiditons, temperature, and the humidity
//clicking a city int he search history results with the current and future conditions for that city-->