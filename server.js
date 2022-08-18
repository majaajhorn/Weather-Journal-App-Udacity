// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

/* Dependencies */
const bodyParser = require('body-parser')

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { request, response } = require('express');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;

// Spin up the server
const server = app.listen(port, listening);

// Callback to debug
function listening(){
    //console.log("Server is running"); 
    console.log(`Running on localhost: ${port}`);
};


// GET route that returns the projectData object
app.get('/all', sendData);


function sendData (req, res) {
  res.send(projectData);
};

// POST route
app.post('/addWeatherData', addData)

// to popraviti
function addData (req, res) {
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.userResponse = req.body.feelings;
    res.json({});
    res.end();
    console.log(projectData);
};
