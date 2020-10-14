const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

// Define paths for Express config
const app = express()
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs') // Set handlebars
app.set('views', viewsPath) //Updates the views path to look for custom directory (templates)
hbs.registerPartials(partialsPath) // Sets up hbs partials

// Set up static directory
app.use(express.static(path.join(__dirname, '../public'))) // Opens the public files to the server

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Liam Averion'
    }) // Renders index.hbs
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Liam Averion'
    }) // Renders index.hbs
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Liam Averion'
    }) // Renders index.hbs
})

app.get('/weather', (req, res) => {
    const { address } = req.query
    if(!address){
        res.send({
            error: 'You must provide an address'
        })
        return
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            res.send({
                error
            })
            return
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({
                    error
                })
                return
            }
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        res.send({
            error: 'You must provide a search term'
        })
        return
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: 'Not Found'
    })
})

// Match anything that hasn't been matched so far
app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: '404 - Page not found',
        title: '404'
    })
})

// Start webapp on port 3000
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})