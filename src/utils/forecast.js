const request = require('request');

const forecast = (lat, lng, callback) => {
    const forecast = 'http://api.weatherstack.com/current?access_key=80ba1ef08e249c9bcb8259202bbbf586&query=' + lat + ',' + lng + '&units=f';

    //request({url: forecast, json: true}, (error, response) => {
    request({url: forecast, json: true}, (error, {body}) => {
     
        if(error){
            callback('Unable to connect to weather service.', undefined);
        }
        else if(body.error){
            callback('Unable to find location.', undefined);
        }
        else{
            // callback(undefined, {
            //     weatherDescription: body.current.weather_descriptions[0],
            //     temperature: body.current.temperature,
            //     feelsLike: body.current.feelslike
            // });
            let currentWeather = (body.current.temperature - 32) * 0.5556 ;
            let feelsLike = (body.current.feelslike - 32) * 0.5556 ;
            callback(undefined, `The weather is ${body.current.weather_descriptions[0]}. The temperature is ${currentWeather} and it feels like ${feelsLike}.`);

        }
    })
};


module.exports = forecast ;