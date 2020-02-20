const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/f5dc4e952a1efafb70adf4134045ebc4/' + lat + ',' + long

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to reach Darksky weather service', undefined)
        } else if (body.error) {
            callback('Darksky was unable to process your request', undefined)
        } else {
            callback(undefined, {
                currently: body.currently, 
                today: body.daily.data[0].summary
            })
        }
    }) 
}

module.exports = forecast