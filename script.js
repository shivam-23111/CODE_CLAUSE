//FUNCTION TO CHANGE THE ICON ACCORDING TO THE WEATHER DESCRIPTION.
function getIconClass(classarg) {
    if (classarg === 'Rain') {
        return 'fas fa-cloud-showers-heavy';
    } else if (classarg === 'Clouds') {
        return 'fas fa-cloud';
    } else if (classarg === 'Clear') {
        return 'fas fa-cloud-sun';
    } else if (classarg === 'Snow') {
        return 'fas fa-snowman';
    } else if (classarg === 'Sunny') {
        return 'fas fa-sun';
    } else if (classarg === 'Mist') {
        return 'fas fa-smog';
    } else if (classarg === 'Thunderstorm' || classarg === 'Drizzle') {
        return 'fas fa-thunderstorm';
    } else {
        return 'fas fa-cloud-sun';
    }
}
//FUNCTION TO CHANGE THE BACKGROUND ACCORDING TO THE WEATHER DESCRIPTION.
function changeBg(status) {
    if (status === 'Clouds') {
        document.body.style.backgroundImage = 'url(clouds.gif)';
    } else if (status === 'Rain') {
        document.body.style.backgroundImage = 'url(rain-raining.gif)';
    } else if (status === 'Clear') {
        document.body.style.backgroundImage = 'url(clear.gif)';
    } else if (status === 'Snow') {
        document.body.style.backgroundImage = 'url(snow.gif)';
    } else if (status === 'Sunny') {
        document.body.style.backgroundImage = 'url(sunny.gif)';
    } else if (status === 'Thunderstorm') {
        document.body.style.backgroundImage = 'url(thunderstorm.gif)';
    } else if (status === 'Drizzle') {
        document.body.style.backgroundImage = 'url(drizzle.jpg)';
    } else if (status === 'Mist' || status === 'Haze' || status === 'Fog') {
        document.body.style.backgroundImage = 'url(rain-raining.gif)';
    } else {
        document.body.style.backgroundImage = 'url(bg.jpg)';
    }
}
//FETCHING THE CURRENT CITY NAME USING IP ADDRESS OF THE REQUESTOR FROM GEOAPIFY API 
fetch('https://api.geoapify.com/v1/ipinfo?apiKey=b4e9ea408ea242d28b47572c08279322')
    .then(response => response.json())
    .then(data => {


        let show = document.getElementById("show");
        let search = document.getElementById("search");
        let cityVal = document.getElementById("city");

        //OPENWEATHER API KEY
        let key = "12f50e7010adc5809ea82f43237ebe98";

        let getWeather = () => {
            let cityValue = cityVal.value;
            if (cityValue.length == 0) {
                show.innerHTML = `<h3 class="error">Please enter a city name</h3>`;

            } else {
                let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
                cityVal.value = "";
                //FETCHING THE WEATHER INFO USING OPENWEATHER API
                fetch(url)
                    .then((resp) => resp.json())
                    .then((data) => {
                        if (data.cod == '404') {
                            show.innerHTML = `<h3 class="error">entered city didn't matched</h3>`;

                        }
                        show.innerHTML = `
                            <div class="location-deatils">
                            <div class="city" id="city">${data.name}, ${data.sys.country} </div>
                            
                        </div>
                        <div class="weather-status">
                            <div class="temp" id="temp">${Math.round(data.main.temp)}&deg;C </div>
                            <div class="weather" id="weather"> ${data.weather[0].main} <i class="${getIconClass(data.weather[0].main)}"></i>  </div>
                            <div class="min-max" id="min-max">${Math.floor(data.main.temp_min)}&deg;C (min) / ${Math.ceil(data.main.temp_max)}&deg;C (max) </div>
                            
                        </div>
                        <hr>
                        <div class="day-details">
                            <div class="basic">Feels like ${data.main.feels_like}&deg;C | Humidity ${data.main.humidity}%  <br> Pressure ${data.main.pressure} mb | Wind ${data.wind.speed} KMPH</div>
                        </div>
                `;
                        changeBg(data.weather[0].main);
                    })

            }
        };
        //FUNCTION FOR GETTING WEATHER INFO USING IP ADDRESS
        let getWeatherbyip = () => {
            let cityname = (data.city.name);
            let cityValue = cityname;

            {
                let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
                cityname = "";
                fetch(url)
                    .then((resp) => resp.json())
                    .then((data) => {
                        show.innerHTML = `
                            <div class="location-deatils">
                            <div class="city" id="city">${data.name}, ${data.sys.country} </div>
                            
                        </div>
                        <div class="weather-status">
                            <div class="temp" id="temp">${Math.round(data.main.temp)}&deg;C </div>
                            <div class="weather" id="weather"> ${data.weather[0].main} <i class="${getIconClass(data.weather[0].main)}"></i>  </div>
                            <div class="min-max" id="min-max">${Math.floor(data.main.temp_min)}&deg;C (min) / ${Math.ceil(data.main.temp_max)}&deg;C (max) </div>
                            
                        </div>
                        <hr>
                        <div class="day-details">
                            <div class="basic">Feels like ${data.main.feels_like}&deg;C | Humidity ${data.main.humidity}%  <br> Pressure ${data.main.pressure} mb | Wind ${data.wind.speed} KMPH</div>
                        </div>
                        
                        
                    `;
                        changeBg(data.weather[0].main);

                    })

            }
        };

        search.addEventListener("click", getWeather);
        searchbyip.addEventListener("click", getWeatherbyip);

    })
    /* --------------- Weather Web App  --------------------- */
