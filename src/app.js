const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geolocation = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// Define path configuration for Express
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

hbs.registerPartials(partialsPath)

// Setting handlebar views and view engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Static path
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Sebastian Narvaez"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Sebastian Narvaez"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        help: "Help",
        title: "Help page",
        name: 'Name'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address was not provided'
        })
    }

    geolocation(req.query.address, (error, {latitude, longitude, address} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(longitude, latitude, (error, data) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecastMessage: data,
                location: address,
                address: req.query.address
            })

        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Search term was not provided.'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Sebastian',
        error: "Error 404: Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Sebastian',
        error: "Error 404: Page not found"
    })
})

app.listen(port, () => {
    console.log('Server up and running at port ' + port)
})