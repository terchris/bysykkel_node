let request = require('request');

let apiKey = '6f254a40c42fdf98c414c4846340a77f';
let city = 'portland';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    console.log('body:', body);
	let weather = JSON.parse(body);
	let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        console.log(message);
  }
});
