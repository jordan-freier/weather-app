const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiamZyZWllciIsImEiOiJjazNhcDRzMnYwM3AyM29vMG0xM3BuaGZqIn0.PRbbff9uUOuA4YnTia_WJw'

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to reach Mapbox geolocation service', undefined)
        } else if (body.features.length < 1) {
            callback('Mapbox was unable to process your request', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode