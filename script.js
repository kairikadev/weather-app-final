function formatDate(timestamp){
    //calculate the date
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes =date.getMinutes();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
   
}
 function formatDay(timestamp){
     let date = new Date(timestamp *1000);
     let day = date.getDay();
     let days =["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

     return days[day];
 }
 function displayForecast(response){

    let forecastElement = document.querySelector("#forecast");
    
    let forecast = response.data.daily;
    let forecastHTML = `<div class="row">`;
   
    forecast.forEach(function(forecastDay){
        forecastHTML = forecastHTML +
        `
            <div class="col-2">
              <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div> 
                <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
                width="42"/>
               <div class="weather-forecast-temperature">
                   <span class="weather-forecast-temperature-max">${forecastDay.temp.max}</span>
                   <span class="weather-forecast-temperature-min">${forecastDay.temp.min}</span>
               </div> 
            </div> 
        
        `;
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
 }

 function getForecast(coordinates){
     let apiKey = "e1011e97bf969d1b569c2b62944075b5 ";
     let apiUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=e1011e97bf969d1b569c2b62944075b&units=metric`;

     axios.get(apiUrl).then(displayForecast);
 }

function displayTemperature(response){
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;

    windElement.innerHTML =Math.round(response.data.wind.speed);
    temperatureElement.innerHTML =Math.round(celsiusTemperature);
    cityElement.innerHTML =response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    dateElement.innerHTML = formatDate(response.data.dt*1000);
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt",response.data.weather[0].description);

    getForecast(response.data.coord);
}

function search(city){
    let apiKey = "e1011e97bf969d1b569c2b62944075b5 ";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e1011e97bf969d1b569c2b62944075b5&units=metric`;
    
    axios.get(apiUrl).then(displayTemperature);
    
}

function handleSubmit(event){
    event.preventDefault();

    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayFahrenheitTemperature(event){
    event.preventDefault();
    
    let fahrenheitTemperature = (celsiusTemperature*9)/5+ 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search();
displayForecast();
