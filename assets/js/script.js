//unique API key to get weather information
var APIKey = "00d7248bf8115d5f89fd7b582d330c1f";
var city= ""

fetch("http://api.openweathermap.org/geo/1.0/direct?q=orlando&limit=1&appid=" + APIKey ).then(response => 
    response.json()
).then(data =>
    console.log(data)
)



//submit input button
var formSubmitHandler = function(event){
    event.preventDefault();
}

