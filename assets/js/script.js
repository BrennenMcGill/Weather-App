var inputSubmitEl = document.querySelector("#city");





// Handler for currentWeather(submit button input) submit button
var currentWeather = function(city) {
    var apiUrlFive = "http://api.openweathermap.org/data/2.5/forecast?q=" + city +"&units=imperial&apikey=b2f5c5fd56830b2ca51bd32529509771";
    fetch(apiUrlFive)
        
        .then(function(response){
            if (response.ok) {
                response.json()
                 .then(function (data) {
                    $("#city-title").text(data.city.name);
                    $("#current-date").text(moment().format("MMM Do YYYY"));
                    $("#current-temp").text(Math.round(data.list[0].main.temp) + "°");
                    $("#current-humidity").text(Math.round(data.list[0].main.humidity));
                    $("#current-wind").text(Math.round(data.list[0].wind.speed));
                    //$("#current-uv-index").text(Math.floor(Math.random() * 10));
                    var iconcode = data.list[0].weather[0].icon;
                    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                    $('#wicon').attr('src', iconurl);
                        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data.city.coord.lat + "&lon=" + data.city.coord.lon + "&apikey=b2f5c5fd56830b2ca51bd32529509771")
                        .then(function(response) {
                            response.json()
                            .then(function(data) {
                                $("#current-uv-index").text(data.current.uvi);
                                if (data.current.uvi < 3) {
                                    $("#current-uv-index").addClass("bg-success text-light border border-success rounded");
                                }
                                if (data.current.uvi >= 3 && data.current.uvi < 6) {
                                    $("#current-uv-index").addClass("bg-warning text-light border border-warning rounded");
                                }
                                if (data.current.uvi >= 6) {
                                    $("#current-uv-index").addClass("bg-danger text-light border border-danger rounded");
                                }
                            })
                        })
                 })
            }
        }
            
            )
    
    // change current weather in main area
   fiveDayForcast(city);
};
    

// Handler fiveDayForcast(submit button input)
var fiveDayForcast = function(city) {
    var apiUrlFive = "http://api.openweathermap.org/data/2.5/forecast?q=" + city +"&units=imperial&apikey=b2f5c5fd56830b2ca51bd32529509771";

    fetch(apiUrlFive)
        .then(function(response){
            if (response.ok) {
                response.json()
                 .then(function (data) {
                    console.log(data);
                 })
                }
            })
}


// Save cities to local storage
var saveCity = function(city) {

}
    // put cities in an array
    // set array in local

// create getCityHistory()
    // getitem from local 
    // parse array
    // append item

// getCityHistory()
// currentWeather(Salt Lake City)

var buttonClickHandler = function(event) {
    //debugger;
    var city = event.value;
    if (city) {
        currentWeather(city.trim());
        saveCity(city.trim());
    }
}

$("#submitbtn").on("click", function() {
    event.preventDefault();
    buttonClickHandler(inputSubmitEl);
    inputSubmitEl.value = "";
});

currentWeather("Salt Lake City");