var inputSubmitEl = document.querySelector("#city");





// Handler for currentWeather(submit button input) submit button
var currentWeather = function(city) {
    var apiUrlFive = "http://api.openweathermap.org/data/2.5/forecast?q=" + city +"&units=imperial&apikey=b2f5c5fd56830b2ca51bd32529509771";

    fetch(apiUrlFive)

    .then(function(response){
       response.json().then(function(data) {
           console.log(data);
       })
    })
    // change current weather in main area
    // call fiveDayForcast(submit button input)
}
    

// Handler fiveDayForcast(submit button input)
    // fetch apiUrlFive
    // append data to five day forcast container


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