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
var currentWeatherDiv = document.getElementById("currentWeather")
var forecastWeatherDiv = document.getElementById("forecastWeather")
var historyDiv = document.getElementById("historyDivCollection")
var forecastTableBody = document.getElementById("forecastTableBbody")
var currentTableBody = document.getElementById("currentTableBbody")
const key = "2fa59b59479c530d5e14fffc2215ca1c";
const imagesSrc = "https://openweathermap.org/img/wn/"
const endImgSrc = "@2x.png"
//execute search button
// var cityHistoryList = JSON.parse(localStorage.getItem("cityHistoryList") || "[]");
var cityHistoryList = JSON.parse(localStorage.getItem("cityHistoryList") || "[]");

if (cityHistoryList.length != 0) {
    setHistoryDiv()
}

var city;
var searchBtn = document.getElementById("searchButton")
searchBtn.addEventListener("click", search)
//called by seach button
function search() {

    let eventText = event.target.textContent
    //get the city from the search box

    if (eventText == "Search!") {
        city = searchInput.value
    }
    //create and display current weather for that city
    currentWeather(city)
    //create and display forecasted weather for that city
    fiveDay(city)
    //add that city to the history
    addToHistory(city)
}
//seacrh a city =>>>>> results: current and future conditions for that city, also adds city to the search history
//current conditions must include: city name, the date, an icon represntation of weather conditions, temperature, humidity, wind speed, and UV index
function currentWeather(city) {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + key
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //h3 which has the text content set to the citys name
        let cityName = document.createElement("h3")
        cityName.textContent = response.name
        //our string containing the url of the icon image
        let iconSrc = imagesSrc + response.weather[0].icon + endImgSrc
        //create an image element and set the source to the url for the icon image
        let iconImg = document.createElement("img")
        iconImg.setAttribute("src", iconSrc);

        //add icon image and name to top row of the div
        let topRow = document.getElementById("topRowCurrent")
        wipeOutChildren(topRow)
        topRow.appendChild(cityName)
        topRow.appendChild(iconImg)

        //bottom row of the table meant to be populated with our data
        let fillerRow = document.getElementById("fillerRow")
        //fill the td's left to right
        //first is filled with the temperature
        fillerRow.children[0].textContent = response.main.temp
        //second filled with the humidity
        fillerRow.children[1].textContent = response.main.humidity
        //third/last one is filled with the wind speed
        fillerRow.children[2].textContent = response.wind.speed

        // https://www.geeksforgeeks.org/how-to-convert-unix-timestamp-to-time-in-javascript/
        date = new Date(response.dt * 1000)
        convertedDate = date.toUTCString()
        convertedDate.substring(5, 16)
        uviIndex(response.coord.lat, response.coord.lon)
    })
}

function uviIndex(lat, lon) {
    let uviURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + lat + "&lon=" + lon
    let status = document.getElementById("status")
    $.ajax({
        url: uviURL,
        method: "GET"
    }).then(function (response) {
        var uviIndex = response.value
        if (uviIndex < 3) {

            currentWeatherDiv.style.backgroundColor = "green"
            status.textContent = "favorable"
        } else if (uviIndex >= 2 && uviIndex <= 5) {    
            currentWeatherDiv.style.backgroundColor = "yellow"
            status.textContent = "moderate"
        } else {
            currentWeatherDiv.style.backgroundColor = "red"
            status.textContent = "severe"
        }
    })
    //when viewing the UV index there is some sort of color that indicates weather consditions (favorable moderate or severe)
}

//future conditions must include the date, icon to rxepresent weather condiditons, temperature, and the humidity
//clicking a city int he search history results with the current and future conditions for that city-->
function fiveDay(city) {
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then((forecast) => {
        let topRow = document.getElementById("topRowForecast")
        let nameCity = document.createElement("h3")
        let fillerRowIcons = document.getElementById("fillerRowIcons")
        let fillerRowDates = document.getElementById("fillerRowDates")
        let fillerRowTemperature = document.getElementById("fillerRowTemperature")
        let fillerRowHumidity = document.getElementById("fillerRowHumidity")

        wipeOutChildren(topRow)
        wipeOutChildren(fillerRowIcons)
        wipeOutChildren(fillerRowDates)
        wipeOutChildren(fillerRowTemperature)
        wipeOutChildren(fillerRowHumidity)
        
        //need to uppercase the first letter of city
            let firstWordCap = city.charAt(0).toUpperCase() + city.substring(1, city.length)
            if(city.indexOf(" ") != -1) {
                let secondWordCap = city.charAt(city.indexOf(" ") + 1).toUpperCase() + city.substring(city.indexOf(" ") + 2, city.length)
                nameCity.textContent =  firstWordCap.substring(0, city.indexOf(" ") + 1) + secondWordCap
            } else {
                nameCity.textContent = firstWordCap
            }
        topRow.appendChild(nameCity)
        //about every 8th response is the next day (starting from 0), increment up from 4
        let control = 4
        for (i = 0; i < 5; i++) {
            let img = document.createElement("img")
            //create a td for an icon
            let tdIcon = document.createElement("td")

            //obtain the icon from api and construct the link that gets the icon
            let iconSrc = imagesSrc + forecast.list[control].weather[0].icon + endImgSrc
            //set the tds background image to the icon source
            // tdIcon.style.backgroundImage = iconSrc
            img.setAttribute("src", iconSrc)
            tdIcon.appendChild(img)
            //append the icon td
            fillerRowIcons.appendChild(tdIcon)

            let tdDate = document.createElement("td")
            let incDate = forecast.list[control].dt_txt
            year = incDate.substring(0, 4)
            let newDate = incDate.substring(5, 10) + "-" + year
            tdDate.textContent = newDate
            fillerRowDates.appendChild(tdDate)

            let tdTemperature = document.createElement("td")
            //0K − 273.15) × 9/5 + 32 = -459.7°F
            let tempConverted = (forecast.list[control].main.temp - 273.13) * (9 / 5) + 32
            tdTemperature.textContent = tempConverted.toFixed(0)
            fillerRowTemperature.appendChild(tdTemperature)

            let tdHumidity = document.createElement("td")
            tdHumidity.textContent = forecast.list[control].main.humidity + "hum"
            fillerRowHumidity.appendChild(tdHumidity)
            control+=8
        }
    })
}

function addToHistory(city) {
    if (cityHistoryList.indexOf(city) == -1) {
        cityHistoryList.push(city)
        localStorage.setItem("cityHistoryList", JSON.stringify(cityHistoryList));
    }
    setHistoryDiv()
}

function setHistoryDiv() {
    if (cityHistoryList.length <= 4) {
        appendCityHistoryList()
    } else {
        //grab last four ditch the rest of the array
        cityHistoryList.splice(0, cityHistoryList.length - 4)
        appendCityHistoryList()
    }
}

function appendCityHistoryList() {

    wipeOutChildren(historyDiv)
    for (i = 0; i < cityHistoryList.length; i++) {
        let cityDiv = document.createElement("div")
        let p = document.createElement("p")
        p.textContent = cityHistoryList[i]
        historyDiv.appendChild(cityDiv)
        cityDiv.appendChild(p)
        cityDiv.style.border = "green solid thick"
        cityDiv.addEventListener("click", () => {
            city = p.textContent
            search()
        })
    }
}
// localStorage.clear()
function wipeOutChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}