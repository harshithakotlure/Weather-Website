const express = require("express");
const app = express();
const https = require("https");
app.use(express.urlencoded({ extended: true}));


app.get("/", function(req,res) {
    res.sendFile(__dirname + "/index.html");
    console.log(req.body.city);
    
    
})

app.post("/", function(req,res) {
    const query = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=75817ebdf610109c09ebf6ff6d2d987d&units=Imperial";
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconURL = "http://openweathermap.org/img/wn/" + icon +  "@2x.png";
            res.setHeader("Content-Type", "text/html");
            res.write("<h2>The weather is currently " + weatherDescription + "</h2>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
            res.write("<img src=" + iconURL + ">");
            res.send();
        })
    })
})


app.listen(3000, function(){
    console.log("Server running on port 3000");
})