const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.climacell.co/v3/weather/realtime?lat=' + encodeURIComponent(latitude) + '&lon=' + encodeURIComponent(longitude) + '&unit_system=si&fields=temp%2Cweather_code&apikey=23T3m8wZ9zmn8wh1NEXB8QtwJna8IQGD'
    request({url, json :true}, (error,{body :data})=>{
        if(error) {
            callback('Unable to connect to weather services !')
        }else if(data.errorCode) {
            callback('Unable to find location')
        }else{
            const weather = data.temp.value + '' + data.temp.units
            const weather_code = data.weather_code.value
            callback(undefined,('It is currently '+weather+' and it will be '+weather_code))
        }
    })
}

module.exports = forecast