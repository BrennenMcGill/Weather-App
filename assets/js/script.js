var inputSubmitEl = document.querySelector("#city");

// Handler for currentWeather(submit button input) submit button
var currentWeather = function (city) {
    var apiUrlFive = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&apikey=b2f5c5fd56830b2ca51bd32529509771";
    fetch(apiUrlFive)

        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        $("#city-title").text(data.city.name);
                        $("#current-date").text(moment().format("MMM Do YYYY"));
                        $("#current-temp").text(Math.round(data.list[0].main.temp) + "°  F");
                        $("#current-humidity").text(Math.round(data.list[0].main.humidity) + '%');
                        $("#current-wind").text(Math.round(data.list[0].wind.speed) + "MPH");
                        //$("#current-uv-index").text(Math.floor(Math.random() * 10));
                        var iconcode = data.list[0].weather[0].icon;
                        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        $('#wicon').attr('src', iconurl);
                        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data.city.coord.lat + "&lon=" + data.city.coord.lon + "&apikey=b2f5c5fd56830b2ca51bd32529509771")
                            .then(function (response) {
                                response.json()
                                    .then(function (data) {
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
                saveCity(city)
            } else {
                alert("Error " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to weather");
        })

    // change current weather in main area
    fiveDayForcast(city);

};


// Handler fiveDayForcast(submit button input)
var fiveDayForcast = function (city) {
    var apiUrlFive = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&apikey=b2f5c5fd56830b2ca51bd32529509771";

    fetch(apiUrlFive)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        $("#day-1").text(moment(data.list[5].dt_txt).format("MMM Do"));
                        $("#temp-1").text(Math.round(data.list[0].main.temp) + "° F");
                        $("#humid-1").text(Math.round(data.list[0].main.humidity) + '%');
                        var iconcode = data.list[5].weather[0].icon;
                        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        $('#wicon-1').attr('src', iconurl);

                        $("#day-2").text(moment(data.list[13].dt_txt).format("MMM Do"));
                        $("#temp-2").text(Math.round(data.list[13].main.temp) + "° F");
                        $("#humid-2").text(Math.round(data.list[13].main.humidity) + '%');
                        var iconcode = data.list[13].weather[0].icon;
                        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        $('#wicon-2').attr('src', iconurl);

                        $("#day-3").text(moment(data.list[21].dt_txt).format("MMM Do"));
                        $("#temp-3").text(Math.round(data.list[21].main.temp) + "° F");
                        $("#humid-3").text(Math.round(data.list[21].main.humidity) + '%');
                        var iconcode = data.list[21].weather[0].icon;
                        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        $('#wicon-3').attr('src', iconurl);

                        $("#day-4").text(moment(data.list[29].dt_txt).format("MMM Do"));
                        $("#temp-4").text(Math.round(data.list[29].main.temp) + "° F");
                        $("#humid-4").text(Math.round(data.list[29].main.humidity) + '%');
                        var iconcode = data.list[29].weather[0].icon;
                        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        $('#wicon-4').attr('src', iconurl);

                        $("#day-5").text(moment(data.list[37].dt_txt).format("MMM Do"));
                        $("#temp-5").text(Math.round(data.list[37].main.temp) + "° F");
                        $("#humid-5").text(Math.round(data.list[37].main.humidity) + '%');
                        var iconcode = data.list[37].weather[0].icon;
                        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        $('#wicon-5').attr('src', iconurl);
                    })
            }
        })

}


// Save cities to local storage
var saveCity = function (city) {
    if (!localStorage.getItem("city")) {
        var cityArray = [];
        cityArray.push(city.toLowerCase());
        // keeps the value of the city name to local
        localStorage.setItem("city", JSON.stringify(cityArray));
    } else {
        var cityArray = JSON.parse(localStorage.getItem("city"));
        if (cityArray.indexOf(city.toLowerCase()) === -1) {
            cityArray.push(city.toLowerCase());
            // keeps the value of the city name to local
            localStorage.setItem("city", JSON.stringify(cityArray));
        }
    }
    getCityHistory();
}

var getCityHistory = function () {
    var cityArray = JSON.parse(localStorage.getItem("city"));
    var listEl = document.querySelector("#history-ul");
    listEl.innerHTML = "";
    for (var i = 0; i < cityArray.length; i++) {
        var listItemEl = document.createElement("li");
        var listButtonEl = document.createElement("button");
        listButtonEl.className = "btn btn-outline-secondary text-dark w-100 text-left";
        listButtonEl.textContent = titleize(cityArray[i]);
        listItemEl.appendChild(listButtonEl);
        listEl.appendChild(listItemEl);
        listButtonEl.addEventListener("click", currentWeather.bind(null, cityArray[i]));
    }
}

// makes sentences look nice credit to https://gist.github.com/cskevint/5817477
function titleize(sentence) {
    if (!sentence.split) return sentence;
    var _titleizeWord = function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        },
        result = [];
    sentence.split(" ").forEach(function (w) {
        result.push(_titleizeWord(w));
    });
    return result.join(" ");
}
var buttonClickHandler = function (event) {
    //debugger;
    var city = event.value;
    if (city) {
        currentWeather(city.trim());
    }
}



var localIpAddress = function () {
    var localIp = "https://json.geoiplookup.io/";
    fetch(localIp)
        .then(function (response) {
            response.json()
                .then(function (data) {
                    currentWeather(data.city);
                })
        })
}

$("#submitbtn").on("click", function () {
    event.preventDefault();
    buttonClickHandler(inputSubmitEl);
    inputSubmitEl.value = "";
});

localIpAddress();