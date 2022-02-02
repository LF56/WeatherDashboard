//unique API key to get weather information
var APIKey = "00d7248bf8115d5f89fd7b582d330c1f";
var lat = "";
var lon = "";


var searchWeather = function () {
    var city = document.getElementById("city").value;

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
            console.log("this is lat" + lat);
            geoData = data
            console.log("call getWather");
            getWeather(data);
        }
        );
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
            console.log(data)
            console.log(data.current.temp)
            console.log(data.current.wind_speed)

            

            for (var i = 1; i <= 5; i++) {
                console.log(data.daily[i])
                var forcast = document.getElementById("card-"+i)



                var dateStamp = document.createElement("p")
                dateStamp.textContent = new Date(data.daily[i].dt * 1000).toLocaleDateString()
                forcast.append(dateStamp)

                var pElTemp = document.createElement("p")
                pElTemp.textContent = "Temp: "+data.daily[i].temp.day
                forcast.append(pElTemp)

                var pElHumidity = document.createElement("p")
                pElHumidity.textContent = `Humidity: ${data.daily[i].humidity} %`
                forcast.append(pElHumidity)

                var pElWind = document.createElement("p")
                pElWind.textContent = `Wind Speed: ${data.daily[i].wind_speed} MPH`
                forcast.append(pElWind)
                
                var imgElIcon = document.createElement("img")
                imgElIcon.setAttribute("src",`http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`)
                forcast.append(imgElIcon)
        
                // var forcast1 = document.getElementById("future-forcast1").innerHTML = (data.daily[i].temp.day);
                // console.log(data.daily[i].temp.day)
            }


            var currentTemp = document.getElementById("current-temp").innerHTML = (data.current.temp);
            var currentHumid = document.getElementById("current-humid").innerHTML = (data.current.humidity);
            var currentWind = document.getElementById("current-wind").innerHTML = (data.current.wind_speed);
            var currentUV = document.getElementById("current-uv").innerHTML = (data.current.uvi);


        }
        );
};



