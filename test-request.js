/*
let request = require('request');

let apiKey = '6f254a40c42fdf98c414c4846340a77f';
let city = 'portland';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`



request(url, function (err, response, body) {
  if(err){
    console.log("request test=", 'error:', error);
  } else {
    console.log("request test=",'body:', body);
	let weather = JSON.parse(body);
	let message = "request test=" + `It's ${weather.main.temp} degrees in ${weather.name}!`;
        console.log(message);
  }
});


var promiserequest = require('request-promise');
console.log("Then the github promise-request test");
promiserequest({
  "method":"GET", 
  "uri": "https://api.github.com/",
  "json": true,
  "headers": {
    "User-Agent": "My little demo app"
  }
}).then(console.log, console.log);

*/


const fetch = require("node-fetch");

const urlfetch =
  "https://maps.googleapis.com/maps/api/geocode/json?address=Florence";

fetch(urlfetch)
  .then(response => {
    response.json().then(json => {
      console.log("From fetch test: ",
        `City: ${json.results[0].formatted_address} -`,
        `Latitude: ${json.results[0].geometry.location.lat} -`,
        `Longitude: ${json.results[0].geometry.location.lng}`
      );
    });
  })
  .catch(error => {
    console.log(error);
  });


  const axios = require("axios");

  const urlaxios =
    "https://maps.googleapis.com/maps/api/geocode/json?address=Florence";
  
  axios
    .get(urlaxios)
    .then(response => {
      console.log("From axios test: ",
        `City: ${response.data.results[0].formatted_address} -`,
        `Latitude: ${response.data.results[0].geometry.location.lat} -`,
        `Longitude: ${response.data.results[0].geometry.location.lng}`
      );
    })
    .catch(error => {
      console.log(error);
    });  