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


// http://api.agromonitoring.com/agro/1.0/weather/forecast

// $(document).ready(function(){

//queryURL = "http://api.agromonitoring.com/agro/1.0/weather/forecast";

var key = "2fa59b59479c530d5e14fffc2215ca1c";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=Philadelphia,Pennsylvania" + "&appid=" + key;// + "&mode=JSON";
// https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}

//"appid=" + key
//key = e95c88903b7c9391171145ed8db2c9eb
// console.log(queryURL)

var lon;
var lat;
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    //seacrh a city =>>>>> results: current and future conditions for that city, also adds city to the search history
    //current conditions must include: city name, the date, an icon represntation of weather conditions, temperature, humidity, wind speed, and UV index

    document.write(response.name)
    // document.write(response.weather[0].icon)
    // let src = JSON.stringify(response.weather[0].icon)
    let src = response.weather[0].icon
    console.log(src)
    let img = document.createElement("img")
    img.setAttribute("src", "http://openweathermap.org/img/wn/" + src + "@2x.png");
    document.body.appendChild(img)
    console.log("Temperature: " + response.main.temp)//TODO convert to farenhiet
    console.log("Humidity: " + response.main.humidity)
    console.log("Wind Speed:" + response.wind.speed)
    lon = response.coord.lon
    lat = response.coord.lat
    console.log(lat + "   " + lon)
    console.log(response.dt)
    let unixTimestamp = response.dt
    // https://www.geeksforgeeks.org/how-to-convert-unix-timestamp-to-time-in-javascript/
    //TODO clean up/condense
    dateObj = new Date(unixTimestamp * 1000);
    utcString = dateObj.toUTCString();
    console.log("Timestamp: " + utcString)
    // document.write(response.)
    // document.write(response.)
    // document.write(response.)

    var uviURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + lat + "&lon=" + lon
    // http://api.openweathermap.org/data/2.5/uvi/history?appid={appid}&lat={lat}&lon={lon}
    console.log(uviURL)
    $.ajax({
        url: uviURL,
        method: "GET"
    }).then(function (response) {
        var uviIndex = response.value
        if(uviIndex < 3) {
            console.log("favorable")
        } else if (uviIndex > 3 && uviIndex < 6) {
            console.log("moderate")
        } else {
            console.log("severe")
        }
        console.log(response.value)

    })
});

//when viewing the UV index there is some sort of color that indicates weather consditions (favorable moderate or severe)
//future conditions must include the date, icon to represent weather condiditons, temperature, and the humidity
//clicking a city int he search history results with the current and future conditions for that city-->




























