const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=6a07a5d63cea0ab295614c0e81816ae8&query=${latitude},${longitude}&units=m`
    request({url, json: true}, (error, {body}) => { 
        if (error) {
            callback('Unable to connect with server', undefined)
        } else if (body.error) {
            callback('Wrong location, please enter a valid latitude and longitude', undefined)
        } else {
            const desc = body.current.weather_descriptions[0]
            const temp = body.current.temperature
            const feelsTemp = body.current.feelslike
            const humidity = body.current.humidity
            const precip = body.current.precip
            callback(undefined, `${desc}. It is currently ${temp}°C. It feels like ${feelsTemp}°C out. There is humidity of ${humidity}% and ${precip}% chance of precipitations.`)
        }

    })
}

module.exports = forecast