/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=3e72fc3fae34d88dfea3f3e9f03be576&units=imperial";
const apiCall = "${baseURL},${zip},us&appid={API key}";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// Function called by an Event Listener
document.getElementById('generate').addEventListener('click', performAction);

async function performAction(e) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeather(baseURL, zip, apiKey)
        .then(function (data) {
            postData('http://127.0.0.1:8000/addWeatherData',
                {
                    date: newDate,
                    temperature: data.main.temp,
                    feelings: feelings,
                })
                .then(function () {
                    dynamicUI()
                })
        }) 
};

// GET weather data
async function getWeather(baseURL, zip, apiKey) {
    const weatherResponse = await fetch(`${baseURL}${zip},us${apiKey}`);
    try {
        const data = await weatherResponse.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

// POST API data
const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
    try {
        const newData = await response.json();
        return newData
    } catch (error) {
        console.log("error", error);
    }
}

// Making dynamic UI
const dynamicUI = async () => {
    const response = await fetch('http://localhost:8000/all');
    try {
        const allData = await response.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.userResponse;
    }
    catch (error) {
        console.log('error', error);
    }
}