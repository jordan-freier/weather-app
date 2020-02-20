const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views config
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Za Wezzah',
        name: "Mingus Kingus"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Mingus Kingus"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        content: "Please oh christ oh god please help me they're coming and I can't stop them please help me for the love of God ple",
        name: "Mingus Kingus"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Weather for where ya dringus?'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData.today + " It is currently " + forecastData.currently.temperature + " degrees outside. There is a " + (forecastData.currently.precipProbability * 100) + "% chance of rain.",
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Help",
        message: "Help article not found ya dangus", 
        name: "Mingus Kingus"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        message: "You fell right into my trap",
        name: "Mingus Kingus"
    })
})


app.listen(3000, () => {
    console.log('Server listening on port 3000...')
})