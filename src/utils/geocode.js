const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWRpdHlhMDIwNTk2IiwiYSI6ImNrYXpqZjRkZzAzODkyeHRjeXF1eXAyMTUifQ.clCHzsM0RljCY5VqZeF08g&limit=1'
    request ({url : url, json : true},(error,{body}) => {
        if(error) {
            callback('Unable to connect to weather services !')
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search')
        }else{
            callback(undefined,{
                'latitude' : body.features[0].center[1],
                'longitude' :body.features[0].center[0],
                'location' : body.features[0].place_name
            })
        }
    })
}


const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.climacell.co/v3/weather/realtime?lat=' + encodeURIComponent(latitude) + '&lon=' + encodeURIComponent(longitude) + '&unit_system=si&fields=temp%2Cweather_code&apikey=23T3m8wZ9zmn8wh1NEXB8QtwJna8IQGD'
    request({url, json :true}, (error,{body : data})=>{
        if(error) {
            callback('Unable to connect to weather services !')
        }else if(data.errorCode) {
            callback('Unable to find location')
        }else{
            callback(undefined,{
                'weather' : data.temp.value + '' + data.temp.units,
                'weather_code' : data.weather_code.value
            })
        }
    })
}

module.exports = geocode