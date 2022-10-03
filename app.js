const express = require('express');
const https = require('https')
const bodyparser = require('body-parser');



let app = express();

app.use(bodyparser.urlencoded({ extended: true }));


app.get('/', function (req, res) {

    res.sendFile(__dirname + '/index.html');
 
});

app.post('/', function (req, res) {
    let userData = req.body.CityName;
    
    
const query = userData;
const apiKey = '5abd003deeed17a99bd8fb6a368c62b2';
const units = 'metric';
let url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;
    

    https.get(url, function (response) {
   
        response.on('data', function (data) {
            const weatherData = JSON.parse(data);
            const des = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imgUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
        
            res.write(`<h1 style="text-align: center;
            margin: 0px auto;
            padding: 50px;
            font-size: 3rem;
            background: linear-gradient(90deg, #fcff9e 0%, #c67700 100%);
            ">The Tempreture in ${userData} is  ${temp} degree Celcius </h1>`);
            res.write(`<p style="text-align: center;
            margin: 0px auto;
            padding: 50px;
            font-size: 3rem;
            background: linear-gradient(90deg, #fcff9e 0%, #c67700 100%);
            " >The weather is currently ${des}</P>`);
            res.write(`<img src = ${imgUrl} style="text-align: center;
            margin: 0px auto;
            padding: 50px;
            background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
            " >`);
            res.send();
        });
    });
});


app.listen(3000, function (req, res) {
    console.log('good to go!');
});  



