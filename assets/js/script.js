//unique API key to get weather information
var APIKey = "00d7248bf8115d5f89fd7b582d330c1f";

/*
fetch("" + APIKey).then(response =>
response.json()
).then(data =>
    console.log(data)
    )

*/


var searchWeather = function () {
    var city = document.getElementById("city").value;
    var lat = "";
    var lon = "";
    
    var geoData;
    console.log("searching weather: " + city);
    //call geo code API 
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey)
        .then(response =>
            response.json()
        )
        .then(data => {
            //get coordinates from response
            lat = data[0].lat;
            lon = data[0].lon;
            //geoData = data
            console.log("call getWather");
            getWeather(data);
            }
        );
    
    console.log("lat: "+lat);
    
};

var getWeather = function (geoData) {
    console.log("inside get weather");
    lat = geoData[0].lat;
    lon = geoData[0].lon;

    //use coordinates to get weather from API
    fetch("https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + APIKey)
        .then(response =>
            response.json()
        )
        .then(data => {
            console.log(data.current.temp)
            console.log(data.current.wind_speed)


            var currentTemp = document.getElementById("current-temp").innerHTML = (data.current.temp);
            var currentHumid = document.getElementById("current-humid").innerHTML = (data.current.humidity);
            var currentWind = document.getElementById("current-wind").innerHTML = (data.current.wind_speed);
            var currentUV = document.getElementById("current-uv").innerHTML = (data.current.uvi);
        }
    );
};
