const request = require('request')

const geolocation = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1Ijoic2ViYXN0aWFubmFydmFlejEiLCJhIjoiY2trM2s2OXhhMTlwMTJvbmp5OGJyNXZzNCJ9.qHlUFoKxj6L_rHfUSYlECQ&limit=1`

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect with server.', undefined)
        } else if (!body.features.length) {
            callback('No matching results', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                address: body.features[0].place_name
            })
        }
    })
    
}

module.exports = geolocation