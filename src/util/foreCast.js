const request = require('request');

const foreCast = function(data,cb){
    request(`http://api.weatherstack.com/current?access_key=06a9e7a232d0b6625311802a44e5f703&query=${data[1]},${data[0]}`, function (error, response, body) {

        if(error){
            cb(error,undefined);
            return;
        }        
        
        var result =JSON.parse(body)
        cb(undefined,result.current.weather_descriptions[0]);        
      });
}
 
module.exports = foreCast;