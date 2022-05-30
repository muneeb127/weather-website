const request = require('request');

//Geocode - Name to lat,lng 
const geocode = (address, callback) => {
    const geocode = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaXRzbXVuZWViMTI3IiwiYSI6ImNreGVndzFkeTBucnYzMnF2MjFkNG1ocXIifQ.f5RraJGmoOgc90Qc13No7Q&limit=1';

    request({ url: geocode, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to geocode service.', undefined);
        }
        else if (body.features.length === 0){
            callback('Unable to find location.Try another search.', undefined);
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })
}


module.exports = geocode ;