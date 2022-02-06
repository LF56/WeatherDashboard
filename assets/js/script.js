//unique API key to get weather information
var APIKey = "00d7248bf8115d5f89fd7b582d330c1f";
var lat = "";
var lon = "";
var historyArr = []

updateLocalStorage = function(key, data){
    window.localStorage.setItem(key, data)
}



var searchWeather = function () {
    var city = document.getElementById("city").value;
    window.city = city

    historyArr.push(city)
    updateLocalStorage("history", JSON.stringify(historyArr))


    window.localStorage.getItem('user');

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
    fetch("http://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + APIKey)
        .then(response =>
            response.json()
        )
        .then(data => {
            console.log(data)
            console.log(data.current.temp)
            console.log(data.current.wind_speed)

                for (var i = 1; i <= 5; i++) {
                console.log(data.daily[i])
                let getChild = document.getElementById("card-" + i);
                getChild.innerHTML = "";

                //remove children of card-i HERE
                var forcast = document.getElementById("card-" + i)


                var dateStamp = document.createElement("p")
                dateStamp.textContent = new Date(data.daily[i].dt * 1000).toLocaleDateString()
                forcast.append(dateStamp)

                var pElTemp = document.createElement("p")
                pElTemp.textContent = "Temp: " + data.daily[i].temp.day +`\u00B0`
                forcast.append(pElTemp)

                var pElHumidity = document.createElement("p")
                pElHumidity.textContent = `Humidity: ${data.daily[i].humidity} %`
                forcast.append(pElHumidity)

                var pElWind = document.createElement("p")
                pElWind.textContent = `Wind Speed: ${data.daily[i].wind_speed} MPH`
                forcast.append(pElWind)

                var imgElIcon = document.createElement("img")
                imgElIcon.setAttribute("src", `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`)
                forcast.append(imgElIcon)
            }
            document.getElementById("current-city").innerHTML = (city);
            document.getElementById("current-temp").innerHTML = (data.current.temp + `\u00B0`);
            document.getElementById("current-humid").innerHTML = (data.current.humidity);
            document.getElementById("current-wind").innerHTML = (data.current.wind_speed);
            document.getElementById("current-uv").innerHTML = (data.current.uvi);
              
        
        }
        );

};






