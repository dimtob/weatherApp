const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// PORT ENV VARIABLE
const port=process.env.PORT || 300

// PATHS
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// TEMPLATES LOCATION- (ΤEMPLATES KAI PARTIALS)
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Dim Tob'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Dim Tob'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Dim Tob'
    })
})

app.get('/geolocation', (req, res) => {
    
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode.geocodeall(req.query.address, (error, geodata) => {
       
        if (error) {
            return res.send({ error })
        }
        res.send(geodata)
    })
})

app.get('/forecast', (req, res) => {
    
    if (!req.query.longtitude||!req.query.latitude) {
        return res.send({
            error: 'something went wrong!'
        })
    }

    forecast(req.query.latitude, req.query.longtitude, (error, forecastData) => {
            
        if (error) {
            return res.send({ error })
        }

        res.send({
            forecast: forecastData            
                })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dim Tob',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dim Tob',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port'+port)
})

//ΣΕ ΠΕΡΙΠΤΩΣΗ ΠΟΥ ΕΧΕΙΣ ΜΟΝΟ ΕΝΑ RESULT ΚΑΙ ΚΑΝΟΥΜΕ ΑΠΕΥΘΕΙΑΣ FORECAST
/*geocode.geocodeall(req.query.address, (error, geodata) => {
        console.log(geodata)
        if (error) {
            return res.send({ error })
        }
        forecast(geodata.latitude, geodata.longtitude, (error, forecastData) => {
            
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location:geodata.location,
                address: req.query.address
            })
        })
    })
})*/