const currLocation = document.getElementById("currLocation");
const currTemp = document.getElementById("currTemp");
const currDay = document.getElementById("currDay");
const currDate = document.getElementById("currDate");
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const displayTemp = document.getElementById("displayTemp");
const invalidInput = document.getElementById("invalidInput");
const weatherIcon = document.getElementById("weatherIcon");
const currCondition = document.getElementById("currCondition");
let cityName = '';
searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    cityName = cityInput.value;
    fetchWeatherData(cityName);
    cityInput.value = '';
    cityInput.placeholder = 'Enter your city name';
});

const getCurrDay = () => {
    const date = new Date();
    const options = { weekday: 'short' };
    const currentDay = date.toLocaleString('en-US', options).slice(0, 3);
    return currentDay;
}
const getCurrDate = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const currentDate = day + ' ' + month;
    return currentDate;
}
currDay.innerText = getCurrDay();
currDate.innerText = getCurrDate();
async function fetchWeatherData(cityName) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=0a2955a001a3fd0bfff2b535e3ec07ba`);
        const data = [await response.json()];
        currLocation.innerText = `${data[0].name}, ${data[0].sys.country}`;
        currTemp.innerHTML = `${(data[0].main.temp - 273.15).toFixed(2)}<sup class="text-black">0</sup>C`;
        invalidInput.style.display = "none";
        currLocation.style.display = "flex";
        displayTemp.style.display = 'flex';
        currCondition.style.display = 'flex';
        const weather = data[0].weather[0].main;
        currCondition.innerText = weather;
        if (weather == "Thunderstorm" || weather == "Rain") {
            weatherIcon.innerHTML = `<span class="material-icons icon ms-3 sun-icon">
            thunderstorm
            </span>`;
        } else if (weather == "Clouds") {
            weatherIcon.innerHTML = `<span class="material-icons icon ms-3 sun-icon">
            wb_cloudy
            </span>`
        } else {
            weatherIcon.innerHTML = `<span class="material-icons icon ms-3 sun-icon">
            wb_sunny
            </span>`;
        }
    } catch (error) {
        currLocation.style.display = "none";
        invalidInput.style.display = 'flex';
        displayTemp.style.display = 'none';
        currCondition.style.display = 'none';
        invalidInput.innerText = "Please input a valid city name"
        console.log(error);
    }
}






