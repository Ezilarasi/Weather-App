const request = require('request');

const geoCoding = function(city,cb){
    request(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoiZXppbGFyYXNpc2VudGhpbCIsImEiOiJja3MwNzg3N2cxaDl6MnZuOG9vNG1qNTcxIn0.SQ0V3sCScWJ-xg8Rog0rsg`, function (error, response, body) {
        if(error){
            cb(error,undefined);
            return;
        }
        var result =JSON.parse(body)        
        cb(undefined,result.features[0].center);        
      });
}

module.exports = geoCoding;