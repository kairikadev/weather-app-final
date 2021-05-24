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
 function displayForecast(){

    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    let days = ["Tue","Wed","Thu","Fri"];
    days.forEach(function(day){
        forecastHTML = forecastHTML +
        `
            <div class="col-2">
              <div class="weather-forecast-date">${day}</div> 
                <img src="http://openweathermap.org/img/wn/03d@2x.png" 
                width="42"/>
               <div class="weather-forecast-temperature">
                   <span class="weather-forecast-temperature-max">20</span>
                   <span class="weather-forecast-temperature-min">18</span>
               </div> 
            </div> 
        
        `;
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
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